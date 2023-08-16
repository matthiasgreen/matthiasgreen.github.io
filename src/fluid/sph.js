// Size of canvas. These get updated to fill the whole browser.
let widthf = 10 * cellSize;
let heightf = 10 * cellSize;

let maxDensity = 1;

let startPos = new Vect2(50, 50);
let lastWriteTime = Date.now();
let lettersDropped = true;

class fluidAnimation {
  constructor() {
    this.pause = false;
    this.initParticles();
    this.sizeCanvas();
    window.addEventListener("mousedown", this.handleMouseDown.bind(this));
    window.addEventListener("mouseup", this.handleMouseUp.bind(this));
    window.addEventListener("mousemove", this.handleMouseMove.bind(this));
    window.addEventListener("keydown", this.handleKeyboard.bind(this));
    window.addEventListener("resize", this.sizeCanvas.bind(this), false);
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }
  initParticles() {
    for (let j = 0; j < 20; j++) {
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(300 + i * 16, heightf - eps - j * 16));
      }
    }
  }

  animationLoop() {

    if (!this.pause){
      maxDensity = 0
      // Sorts particles into grid of size 2h (O(h)), meaning that any particle looks at adjacent 9 squares to find neighbors: improves performance massively
      grid = new Array(heightf / cellSize);
      for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(widthf / cellSize);
        for (let j = 0; j < grid[0].length; j++) {
          grid[i][j] = [];
        }
      }
    
      if (!lettersDropped && Date.now() > lastWriteTime + 1000) {
    
        for (let pi of newParticles) {
          pi.creationTime = Date.now();
          pi.vel = new Vect2(Math.random()*100, Math.random()*100)
          pi.mass = 2.5;
          particles.push(pi);
          for (let i = 1; i <= 3; i++) {
            let p = new Particle(pi.pos.x+h*i/2, pi.pos.y+Math.random()+h*i/2)
            p.vel = new Vect2(Math.random()*10, Math.random()*10)
            particles.push(p);
          }
        }
        newParticles = [];
        lettersDropped = true;
        startPos = new Vect2(50, 50);
      }
    
      for (let pi of particles) {
        pi.sortIntoGrid();
      }
      for (let pi of newParticles) {
        pi.sortIntoGrid();
      }
    
      for (let pi of particles) { // O(n)
        pi.updateDensityPressure();
      }
    
      for (let pi of particles) { //O(n)
        pi.updateForces(); //O(n**2)
      }
    
      for (let pi of particles) { //O(n)
        //pi.leapfrog(); //O(1)
        pi.integrate();
      }
    
      for (let pi of particles) { //O(n)
        pi.stayWithinBounds(); //O(1)
      }
    
      evaporate();
    
      // Clear the canvas and redraw all the fluid
      const ctx = document.getElementById("fluid-canvas").getContext("2d");
      ctx.clearRect(0, 0, widthf, heightf);
    
      for (let pi of particles) {
        //pi.draw(ctx);
      }
      for (let pi of newParticles) {
        //pi.draw(ctx);
      }
      //drawgrid(ctx);
      drawASCII(ctx);
    }
    window.requestAnimationFrame(this.animationLoop.bind(this));
  }

  sizeCanvas() {
    const canvas = document.getElementById("fluid-canvas");
    widthf = document.getElementById("fluid-container").clientWidth;
    widthf -= widthf % cellSize;
    heightf = document.getElementById("fluid-container").clientHeight;
    heightf -= heightf % cellSize;
    canvas.width = widthf;
    canvas.height = heightf;
  }

  writeExample() {
    const startPos = new Vect2(50, 200);
    for (let letter of ['A', 'B', 'C']) {
      const bitmap = getMap(letter);
      for (let x = 0; x < bitmap[0].length; x++) {
        for (let y = 0; y < bitmap.length; y++) {
          if (bitmap[y][x]) {
            newParticles.push(new Particle(startPos.x + x * 30, startPos.y + y * 30));
            newParticles[newParticles.length - 1].mass = 50
          }
        }
      }
      startPos.x += 30 * 6
    }
  }

  writeLetter(letter) {
    lettersDropped = false;
    const bitmap = getMap(letter);
    for (let x = 0; x < bitmap[0].length; x++) {
      for (let y = 0; y < bitmap.length; y++) {
        if (bitmap[y][x]) {
          newParticles.push(new Particle(startPos.x + x * 30, startPos.y + y * 30));
          newParticles[newParticles.length - 1].mass = 50
        }
      }
    }
    startPos.x += 30 * bitmap[0].length+10;
    lastWriteTime = Date.now();
  }

  handleMouseDown(event) {
    click.active = true;
  }

  handleMouseMove(event) {
    click.pos.x = event.clientX;
    click.pos.y = event.clientY;
  }

  handleMouseUp(event) {
    click.active = false;
  }

  isLetter(char) {
    return /^[a-zA-Z ]$/.test(char);
  }

  handleKeyboard(event) {
    const letter = event.key;
    if (this.isLetter(letter)) {
      this.writeLetter(letter.toUpperCase());
    } else if (letter === 'Enter') {
      startPos.y += (getMap('A').length+1)*30;
      startPos.x = 50;
      lastWriteTime = Date.now();
    }
  }
}

function drawgrid(context) {
  let cellSize = 16;
  let widthCells = Math.floor(widthf / cellSize);
  let heightCells = Math.floor(heightf / cellSize);
  for (let x = 0; x < widthCells; x++) {
    for (let y = 0; y < heightCells; y++) {
      /*context.fillStyle = `rgb(
        ${nbPart/10*255},
        ${nbPart/10*255},
        ${nbPart/10*255},
        )`;*/
      //context.fillStyle = "white";
      let density = getLocalDensity(new Vect2(x * cellSize, y * cellSize));
      context.fillStyle = `hsl(
        ${255 - Math.floor(Math.sqrt(density) * 255) * 3},
        100%,
        50%)`;

      context.beginPath();
      context.rect(x * cellSize, y * cellSize, cellSize, cellSize);
      context.fill();
      context.closePath();
    }
  }
}

function drawASCII(context) {
  let cellSize = 16;
  let widthCells = Math.floor(widthf / cellSize);
  let heightCells = Math.floor(heightf / cellSize);
  for (let x = 0; x < widthCells; x++) {
    for (let y = 0; y < heightCells; y++) {
      /*context.fillStyle = `rgb(
        ${nbPart/10*255},
        ${nbPart/10*255},
        ${nbPart/10*255},
        )`;*/
      //context.fillStyle = "white";
      let density = getLocalDensity(new Vect2(x * cellSize, y * cellSize));

      let grayscale = 255 - Math.floor(Math.sqrt(density) * 255) * 3

      const grayRamp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
      const rampLength = grayRamp.length;

      // the grayScale value is an integer ranging from 0 (black) to 255 (white)
      const getCharacterForGrayScale = grayScale =>
        grayRamp[Math.ceil(((rampLength - 1) * grayScale) / 255)];

      let char = getCharacterForGrayScale(grayscale);
      if (char === undefined) {
        char = '$';
      }

      //context.beginPath();
      context.font = "17px Monospace";
      context.fillStyle = "white";
      context.fillText(char, x * cellSize, y * cellSize);
      //context.closePath();
    }
  }
}