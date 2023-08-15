/// <reference path="utils.js" />

// Simulation parameters
const dt = 0.00065;
const boundDamping = -0.3;
const eps = 20;

// Solver parameters
const h = 16;
const hsq = h**2;
const gasConst = 2000;
const restDensity = 300;
const gravConst = 10;
const visc = 100;
const cellSize = 2*h;

// Smoothing kernel constants
const poly6 = 4 / (Math.PI * h ** 8);
const spikyGrad = -10 / (Math.PI * h ** 5);
const viscLap = 40 / (Math.PI * h ** 5);

// Global lists
let particles = [];
let grid = [];
let newParticles = [];
let border = [];

class Force {
  constructor() {
    this.force = new Vect2(0, 0);
    this.active = false;
  }

  computeForce(particle) {
    this.force = new Vect2(0, 0);
  }

  apply(particle) {
    if (this.active){
      this.computeForce(particle);
      particle.forces = particle.forces.add(this.force)
    }
  }
}

class PressureViscosity extends Force { //computed simultaneously for efficiency
  constructor() {
    super();
    this.active = true;
  }

  computeForce(particle) {
    this.force = new Vect2(0, 0);
    for (let otherParticle of particle.getAdjacentParticles()) {
      if (otherParticle !== particle){ //for every different particle

        let dist = particle.dist(otherParticle);
        let diff = otherParticle.pos.subtract(particle.pos);
        if (dist < h) {
          // Pressure force
          this.force = this.force.add(diff.normalized().multiply(-1 * particle.mass * (otherParticle.pressure + particle.pressure) / (2 * otherParticle.density) * spikyGrad * (h - dist) ** 3)  );
          // Viscosity force
          this.force = this.force.add(otherParticle.vel.subtract(particle.vel).multiply(visc * particle.mass / otherParticle.density * viscLap * (h-dist)));
        } 
      }
    }
  }
}

class Gravity extends Force {
  constructor() {
    super();
    this.active = true;
  }

  computeForce(particle) {
    this.force = new Vect2(0, 1).multiply(gravConst * particle.mass / particle.density);
  }
}

class Click extends Force {
  constructor(x, y) {
    super();
    this.pos = new Vect2(x, y);
    this.strength = 5e7;
    this.active = false;
  }
  computeForce(particle) {
    this.force = particle.pos.subtract(this.pos).normalized().multiply(this.strength / (particle.pos.distSquared(this.pos)+10));
  }
}
let click = new Click(0, 0);
let forces = [new PressureViscosity(), new Gravity(), click];

class Particle {
  constructor(x, y) {
    this.pos = new Vect2(x, y);
    this.vel = new Vect2(Math.random()*10, Math.random()*10);
    this.velHalf = this.vel.clone();
    this.density = 1;
    this.pressure = 1;
    this.forces = new Vect2(0, 0);
    this.oldForces = new Vect2(0, 0);
    this.cellX = 0;
    this.cellY = 0;
    this.creationTime = Date.now();
    this.mass = 2.5;
  }

  distSquared(other) {
    return this.pos.distSquared(other.pos);
  }

  dist(other) {
    return this.pos.dist(other.pos);
  }

  sortIntoGrid() {
    // Calculate which cell the point belongs in
    const cellX = Math.floor(this.pos.x / cellSize);
    const cellY = Math.floor(this.pos.y / cellSize);
    if (isNaN(cellX) || isNaN(cellY)){
      return;
    }

    // Add the point to that cell in the grid
    if (validIndex(cellX, cellY, grid[0].length, grid.length)) {
      grid[cellY][cellX].push(this);
    }
    this.cellX = cellX;
    this.cellY = cellY;
  }

  getAdjacentParticles() {
    let adjacent = [];
    for (let i=-1; i<2; i++) {
      for (let j=-1; j<2; j++){
        if (validIndex(this.cellX+i, this.cellY+j, grid[0].length, grid.length) && grid[this.cellY+j][this.cellX+i] instanceof Array){
          for (let p of grid[this.cellY+j][this.cellX+i]){
            adjacent.push(p);
          }
        }
      }
    }
    return adjacent;
  }

  updateDensityPressure() {
    // Compute local density using poly6 kernel function 
    this.density = 0;
    for (let pi of this.getAdjacentParticles()) {
      let dist = this.distSquared(pi);
      if (dist<hsq) {
        this.density += pi.mass * poly6 * (hsq-dist) ** 3;
      }
    }
    // Update local pressure from density
    this.pressure = gasConst * (this.density - restDensity);

    if (this.density > maxDensity){
      maxDensity = this.density;
    }
  }

  updateForces() {
    this.oldForces = this.forces.clone();
    
    this.forces = new Vect2(0, 0);
    
    for (let force of forces){
      force.apply(this);
    }

    if (!isFinite(this.forces.x) || !isFinite(this.forces.y)){
      this.forces = new Vect2(0, 0);
    }

    if (this.forces.norm > 1e5){
      this.forces = this.forces.normalized().multiply(1e4);
    }

    /* if (isNaN(fgrav.x) || isNaN(fgrav.y)) {
      console.log("fgrav");
    } else if (isNaN(fpress.x) || isNaN(fpress.y)) {
      console.log("fpress");
    } else if (isNaN(fvisc.x) || isNaN(fvisc.y)) {
      console.log("fvisc");
    } else if (isNaN(fclick.x) || isNaN(fclick.y)) {
      console.log("fclick");
    } else {
      // Sum forces
      this.forces = fgrav.add(fvisc).add(fpress).add(fclick);
    } */
  }

  // TODO: replace integrate with leapFrog algorithm for extra stability

  leapfrog() {
    this.velHalf = this.velHalf.add(this.forces.multiply(dt / this.density )); // veln+1/2 = veln + fn
    this.vel = this.velHalf.add(this.forces.multiply(dt / (2 * this.density)));
    this.pos = this.pos.add(this.velHalf.multiply(dt));
    

  }

  integrate() {
    if (isNaN(this.pos.x) || isNaN(this.pos.y)) {
      this.pos = new Vect2(200, 200);
      this.vel = new Vect2(Math.random()*10, Math.random()*10);
      this.density = 1;
      this.pressure = 0;
      this.forces = new Vect2(0, 0);
      this.cellX = 0;
      this.cellY = 0;
    }
    this.vel = this.vel.add(this.forces.multiply(dt / this.density));
    this.pos = this.pos.add(this.vel.multiply(dt));
  }

  stayWithinBounds() {
    console.log()
    if (this.pos.x - eps < 0) {
      this.vel.x *= boundDamping;
      this.pos.x = eps;
    } else if (this.pos.x + eps > widthf) {
      this.vel.x *= boundDamping;
      this.pos.x = widthf - eps;
    }
    if (this.pos.y - eps < 0) {
      this.vel.y *= boundDamping;
      this.pos.y = eps;
    }
    //let gaussian = 100*Math.exp(-1 * (this.pos.x-width/2)**2 / 100**2);
    if (this.pos.y + eps > heightf) {
      this.vel.y *= boundDamping;
      this.pos.y = heightf-eps;
    }
  }

  draw(context) {
    context.beginPath();
    context.arc(this.pos.x, this.pos.y, 7, 0, 2 * Math.PI, false);
    context.fillStyle = `rgb(
      ${this.density/maxDensity*255+50}
      ${this.density/maxDensity*255}
      ${this.density/maxDensity*255}
      )`;
    context.fill();
  }
}

function evaporate() { // Cannot be part of Particle class due to use of filter
  const maxTime = 10e3;
  const minTime = 7e3;
  const currentTime = Date.now();
  particles = particles.filter(particle => {
    const lifetime = Date.now() - particle.creationTime;
    const chance = (lifetime - minTime) / (maxTime - minTime);
    return chance < Math.random();
  });
}

function getLocalDensity(pos) { // Used by display function, not by particle

  // Find location in grid and get all adjacent particles 
  const cellX = Math.floor(pos.x / cellSize);
  const cellY = Math.floor(pos.y / cellSize);
  let adjacent = [];
  for (let i=-1; i<2; i++) {
    for (let j=-1; j<2; j++){
      if (validIndex(cellX+i, cellY+j, grid[0].length, grid.length)){
        for (let p of grid[cellY+j][cellX+i]){
          adjacent.push(p);
        }
      }
    }
  }

  // Calculate local density;
  let density = 0;
  for (let p of adjacent) {

    let dist = pos.distSquared(p.pos);
    if (dist<hsq) {
      density += p.mass * poly6 * (hsq-dist) ** 3;
    }
  }
  return density;
}