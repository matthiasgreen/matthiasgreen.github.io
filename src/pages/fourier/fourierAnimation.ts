// //import { complex, re, im } from 'math.js'


// const pageLoadTime = new Date().getTime();
// function getTimeSinceLoadInSeconds() {
//   const currentTime = new Date().getTime();
//   const timeSinceLoadInSeconds = (currentTime - pageLoadTime) / 1000;
//   return timeSinceLoadInSeconds;
// }

// //Not my code, all OK
// class PathSampler {
//   segments: any[];

//   constructor(source) {
//     const data = parse(source, {normalize: true});
//     const d0 = data[0];
//     const d1 = data[data.length - 1];
//     if (d0.type !== "M") throw new Error("expected M");
//     if (d1.type !== "Z") throw new Error("expected Z");
//     const segments = Array.from({length: data.length - 2}, (_, i) => {
//       const {type, values} = data[i + 1];
//       switch (type) {
//         case "C": return new C(data[i].values.slice(-2).concat(values));
//         case "L": return new L(data[i].values.slice(-2).concat(values));
//       }
//     });
//     const start = d0.values.slice(0, 2);
//     const end = data[data.length - 2].values.slice(-2);
//     if (start[0] !== end[0] || start[1] !== end[1]) {
//       segments.push(new L(end.concat(start)));
//     }
//     this.segments = segments;
//   }
//   pointAt(t) {
//     const n = this.segments.length;
//     if (!((t *= n) >= t)) return;
//     const i = Math.max(0, Math.min(n - 1, Math.floor(t)));
//     return this.segments[i].pointAt(t % 1);
//   }
// }

// class L {
//   constructor(values) {
//     this.values = values;
//   }
//   pointAt(t) {
//     const [x0, y0, x1, y1] = this.values;
//     const a = t;
//     const b = 1 - t;
//     return [
//       a * x0 + b * x1,
//       a * y0 + b * y1
//     ];
//   }
// }

// class C {
//   constructor(values) {
//     this.values = values;
//   }
//   pointAt(t) {
//     const [x0, y0, x1, y1, x2, y2, x3, y3] = this.values;
//     const a = (1 - t) ** 3;
//     const b = 3 * (1 - t) ** 2 * t;
//     const c = 3 * (1 - t) * t ** 2;
//     const d = t ** 3;
//     return [
//       a * x0 + b * x1 + c * x2 + d * x3,
//       a * y0 + b * y1 + c * y2 + d * y3
//     ];
//   }
// }

// //Fourier animation class
// export class fourierAnimation {
//   constructor() {
//     this.canvas = document.getElementById("fourier-canvas");
//     this.context = this.canvas.getContext("2d");
//     this.svg = document.getElementById('drawingSVG');
//     this.pause = false;
//     this.speed = 10;
    
//     //display parameters
//     this.unitFact = 10; //amount of grid lines per screen width (units per screen width)
//     this.unitSize; //number of pixels per unit

//     //animation parameters
//     this.maxSeriesSize = 30;
//     this.seriesSize = 30; // seriesSize*2+1 is the size of the fourier series
//     this.M = 100;

//     this.history = []; // history of points for trail tracing
//     this.c = []; // array containing c_n coefficients (order is n=0, 1, -1, 2, -2, etc)
//     this.n = []; // array containing n values (0, 1, -1, 2, -2, etc)

//     this.isDrawing = false;
//     this.points = [];

//     this.imagePoints = []; // complex coordinates of parametric points
//     this.imagePointsRaw = []; // real coordinates of parametric points

//     this.init();
//   }

//   init(){
//     this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
//     this.canvas.addEventListener('mousemove', this.draw.bind(this));
//     this.canvas.addEventListener('mouseup', this.endDrawing.bind(this));
//     this.canvas.addEventListener('mouseout', this.endDrawing.bind(this));

//     this.resizeCanvas();

//     // get c and n coefficients
//     this.getCoefficients()
//       .then(() => window.requestAnimationFrame(this.animationLoop.bind(this))
//     )
//     var speedSlider = document.getElementById("speedSlider");
//     speedSlider.oninput = () => {
//       this.speed = speedSlider.value;
//       this.history = [];
//     }
//     var sizeSlider = document.getElementById("sizeSlider");
//     sizeSlider.oninput = () => {
//       this.seriesSize = sizeSlider.value;
//       this.history = [];
//     }
//   }

//   convertValueToCoordinates(value){
//     const centerX = this.canvas.width/2;
//     const centerY = this.canvas.height/2;
  
//     const coord = this.canvas.width/this.unitFact*value;
  
//     return coord;
//   }

//   convertComplexToCoordinates(complex) {
//     const centerX = this.canvas.width/2;
//     const centerY = this.canvas.height/2;
//     const pos = [centerX + (this.canvas.width/this.unitFact)*math.re(complex), centerY - (this.canvas.width/this.unitFact)*math.im(complex)];
//     return pos;  
//   }

//   convertCoordinatesToComplex(pos) {
//     const centerX = this.canvas.width/2;
//     const centerY = this.canvas.height/2;
//     const re = (pos[0] - centerX) * this.unitFact / this.canvas.width;
//     const im = (centerY - pos[1]) * this.unitFact / this.canvas.width;
//     const complex = math.complex(re, im);
//     return complex;
//   }

//   //needs to be rewritten
//   getCoefficients(){
//     const i = math.complex(0, 1);

//     this.n = [0];
//     for (let j = 1; j <= this.maxSeriesSize; j++) {
//       this.n.push(j, -j);
//     }

//     //var image = new SVGSVGElement();
//     var promise = fetch("./media/fourier.svg") //fetching svg
//       .then(response => response.text())
//       .then(text => (new DOMParser).parseFromString(text, "image/svg+xml")) //parse to text
//       .then(svg => svg.documentElement) //get image from svg
//       .then(image => image.querySelector("path")) //get path data from image
//       .then(path => new PathSampler(path.getAttribute("d")))
//       .then(pathSampler => Array.from({length: this.M}, (_, i) => pathSampler.pointAt(i / this.M))) // get parametric sample locations from path
//       .then(parametricSamples => { 
//         //convert all sample points to complex numbers
//         this.imagePointsRaw = parametricSamples;
//         for (let sample of parametricSamples){
//           var complexPoint = this.convertCoordinatesToComplex(sample);
//           this.imagePoints.push(complexPoint);
//         }
//         //calculate integrals and push c coefficients
//         for (let j = 0; j < this.maxSeriesSize*2+1; j++) {

//           var exp = math.exp(math.multiply(-this.n[j], 2*Math.PI, i));
//           var totalSum = math.complex(0, 0);
//           for (let k = 0; k < this.imagePoints.length; k++){
//             var exp = math.exp(math.multiply(-this.n[j], 2*Math.PI, i, k/this.imagePoints.length));
//             var toAdd = math.multiply(this.imagePoints[k], exp, 1/this.imagePoints.length)
//             totalSum = math.add(totalSum, toAdd)
//           }
//           this.c[j] = totalSum;
//         }
//     })

//     return promise;
//   }

//   getCoefficientsDrawing(){
//     const i = math.complex(0, 1);

//     //reset from initial drawing
//     for (let j = 0; j < this.c.length; j++) {
//       this.c[j] = math.complex(0, 0);
//     }
//     this.imagePoints = [];
//     this.imagePointsRaw = [];
//     this.history = [];
    

//     this.n = [0];
//     for (let j = 1; j <= this.maxSeriesSize; j++) {
//       this.n.push(j, -j);
//     }
//     let image = document.getElementById("drawingSVG"); //get image from svg
//     let path = image.querySelector("path"); //get path data from image
//     let pathSampler = new PathSampler(path.getAttribute("d"));
//     let parametricSamples = Array.from({length: this.M}, (_, i) => pathSampler.pointAt(i / this.M)); // get parametric sample locations from path
//     //convert all sample points to complex numbers
//     this.imagePointsRaw = parametricSamples;
//     for (let sample of parametricSamples){
//       var complexPoint = this.convertCoordinatesToComplex(sample);
//       this.imagePoints.push(complexPoint);
//     }
//     //calculate integrals and push c coefficients
//     for (let j = 0; j < this.maxSeriesSize*2+1; j++) {

//       var exp = math.exp(math.multiply(-this.n[j], 2*Math.PI, i));
//       var totalSum = math.complex(0, 0);
//       for (let k = 0; k < this.imagePoints.length; k++){
//         var exp = math.exp(math.multiply(-this.n[j], 2*Math.PI, i, k/this.imagePoints.length));
//         var toAdd = math.multiply(this.imagePoints[k], exp, 1/this.imagePoints.length)
//         totalSum = math.add(totalSum, toAdd)
//       }
//       this.c[j] = totalSum;
//     }
//   }

//   // to be renamed
//   drawSamples() {
//     for (let point of this.imagePointsRaw) {
//       this.drawPoint(point);
//     }
//   }

//   // draw background grid
//   drawGrid() {
//     const numLines = Math.floor(this.canvas.height/this.unitSize)+1
//     const gridSize = this.canvas.width / this.unitFact;
//     var verticalOffset;
//     if (numLines % 2 == 1) {
//       verticalOffset = this.canvas.height % this.unitSize/2;
//     } else {
//       verticalOffset = this.canvas.height % this.unitSize/2 - this.unitSize/2;
//     }
//     this.context.strokeStyle = 'white';
//     this.context.lineWidth = 0.3;
  
//     for (let i = 0; i <= this.unitFact; i++) {
//       const xPos = i * gridSize;
//       // Draw vertical line
//       this.context.beginPath();
//       this.context.moveTo(xPos, 0);
//       this.context.lineTo(xPos, this.canvas.height);
//       this.context.stroke();
  
//       // Draw horizontal line
//       this.context.beginPath();
//       this.context.moveTo(0, xPos+verticalOffset);
//       this.context.lineTo(this.canvas.width, xPos+verticalOffset);
//       this.context.stroke();
//     }
//   }

//   drawPoint(pos) {
//     this.context.beginPath();
//     this.context.arc(pos[0], pos[1], 2, 0, 2 * Math.PI, false);
//     this.context.fillStyle = 'white';
//     this.context.lineWidth = 3;
//     this.context.fill();
//     this.context.strokeStyle = '#ffffff';
//     this.context.stroke();
//   }

//   //needs to be rewritten
//   animateFourier() {
//     const t = getTimeSinceLoadInSeconds()/this.speed;
//     const i = math.complex(0, 1);
//     //task: trace final point, coordinates are sum of complex exponiatials with cn coefficient and increasing rate
//     //in order +1, -1, +2, -2, +3, -3, etc trace circle linked to each other and hand

//     var p = math.complex(0, 0);
//     var oldp = math.complex(0, 0);

//     //draw first circle
//     var coords = this.convertComplexToCoordinates(p);
//     this.context.strokeStyle = "#ffffff55";
//     this.context.lineWidth = 1;
//     this.context.beginPath();
//     this.context.arc(coords[0], coords[1], this.convertValueToCoordinates(math.abs(this.c[0])), 0, 2*Math.PI, false)
//     this.context.stroke();
//     this.context.closePath()
//     for (let j = 0; j < this.seriesSize*2+1; j++){
//       //add another exponential to the sum
//       const toAdd = math.multiply(this.c[j], math.exp(math.multiply(this.n[j], 2, Math.PI, i, t)))
//       p = math.add(p, toAdd);

//       //draw bar
//       this.context.strokeStyle = "red";
//       this.context.lineWidth = 1;
//       var oldCoords = this.convertComplexToCoordinates(oldp);
//       var coords = this.convertComplexToCoordinates(p);
//       this.context.beginPath();
//       this.context.moveTo(oldCoords[0], oldCoords[1]);
//       this.context.lineTo(coords[0], coords[1]);
//       this.context.stroke();
//       this.context.closePath()
      

//       oldp = p;

//       //draw circle
//       coords = this.convertComplexToCoordinates(p);

//       this.context.strokeStyle = "#ffffff55";
//       this.context.lineWidth = 1;
//       this.context.beginPath();
//       this.context.arc(coords[0], coords[1], this.convertValueToCoordinates(math.abs(this.c[j])), 0, 2*Math.PI, false)
//       this.context.stroke();
//       this.context.closePath();

//     }
//     //draw end point
//     coords = this.convertComplexToCoordinates(p);
//     this.drawPoint(coords);


//     //save point history
//     this.history.push(coords);
//     this.history = this.history.slice(-(58*this.speed));

//     //draw trail
//     this.context.strokeStyle = "yellow";
//     this.context.lineWidth = 2;
//     this.context.beginPath();
//     this.context.moveTo(this.history[0][0], this.history[0][1]);
//     for (const point of this.history) {
//       this.context.lineTo(point[0], point[1]);
//     }
//     this.context.stroke();
//   }

//   // Main animation loop
//   animationLoop() {

//     if (!this.pause){
//       // Clear the canvas
//       this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

//       //draw new frame
//       this.drawGrid();
//       this.animateFourier();
//       //this.drawSamples();
//       this.displayDrawing();
//     }

//     // Schedule the next frame
//     window.requestAnimationFrame(this.animationLoop.bind(this));
//   }

//   displayDrawing(){
//     if (!this.isDrawing) return;

//     this.context.strokeStyle = "white"
//     this.context.beginPath();
//     this.context.moveTo(this.points[0].x, this.points[0].y);
  
//     for (let i = 1; i < this.points.length - 2; i += 3) {
//       const control1X = this.points[i].x;
//       const control1Y = this.points[i].y;
//       const control2X = this.points[i + 1].x;
//       const control2Y = this.points[i + 1].y;
//       const endX = this.points[i + 2].x;
//       const endY = this.points[i + 2].y;
//       this.context.bezierCurveTo(control1X, control1Y, control2X, control2Y, endX, endY);
//     }
  
//     this.context.stroke();
//   }

//   startDrawing(event) {
//     this.isDrawing = true;
//     this.points = [];
//     const { offsetX, offsetY } = event;
//     this.points.push({ x: offsetX, y: offsetY });
//   }

//   draw(event) {
//     if (!this.isDrawing) return;
  
//     const { offsetX, offsetY } = event;
//     this.points.push({ x: offsetX, y: offsetY });
//   }

//   endDrawing() {
//     if (!this.isDrawing) return;
//     this.isDrawing = false;
    
//     if (document.getElementById("drawingSVG").querySelector("path") !== null){
//       document.getElementById("drawingSVG").querySelector("path").remove();
//     }
//     const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
//     let d = `M ${this.points[0].x} ${this.points[0].y}`;
//     for (let i = 1; i < this.points.length - 2; i += 3) {
//       const control1X = this.points[i].x;
//       const control1Y = this.points[i].y;
//       const control2X = this.points[i + 1].x;
//       const control2Y = this.points[i + 1].y;
//       const endX = this.points[i + 2].x;
//       const endY = this.points[i + 2].y;
//       d += ` C ${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`;
//     }
//     // Automatically close the path
//     d += ` L ${this.points[this.points.length - 1].x} ${this.points[this.points.length - 1].y} Z`;
  
//     svgPath.setAttribute("d", d);
//     svgPath.setAttribute("stroke", "black");
//     svgPath.setAttribute("fill", "none");
//     this.svg.appendChild(svgPath);
    
//     this.getCoefficientsDrawing()
//   }

//   resizeCanvas() {
//     const width = document.getElementById("fourier-container").clientWidth;
//     const height = document.getElementById("fourier-container").clientHeight;
//     this.canvas.width = width;
//     this.canvas.height = height;
//     this.unitSize = this.canvas.width/this.unitFact;
//   }
// }

// window.onload = function() {
//   var anim = new fourierAnimation()
//   window.addEventListener("resize", anim.resizeCanvas.bind(anim), false);
// }


interface Point {
  x: number;
  y: number;
}

export class FourierRenderer {
  static readonly MAX_SERIES_SIZE: number = 30;
  static readonly MIN_SERIES_SIZE: number = 1;
  static readonly DEFAULT_SERIES_SIZE: number = 30;

  static readonly MAX_SPEED: number = 100;
  static readonly MIN_SPEED: number = 1;
  static readonly DEFAULT_SPEED: number = 10;

  private ctx: CanvasRenderingContext2D;
  private startTimeMs: number = Date.now();
  private trail: Point[] = [];
  private seriesSize: number = FourierRenderer.DEFAULT_SERIES_SIZE;
  private speed: number = FourierRenderer.DEFAULT_SPEED;
  private scale: number = 100;  // pixels per unit
  private center: Point; // in units

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.center = this.pixelToUnit({ x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 });
  }

  renderFrame() {
    this.clearCanvas();
    this.drawGrid();
    this.drawCircles();
    this.drawTrail();
    this.drawPoint();
  }

  setSpeed(speed: number) {
    this.speed = Math.min(Math.max(speed, FourierRenderer.MIN_SPEED), FourierRenderer.MAX_SPEED);
  }

  setSeriesSize(seriesSize: number) {
    this.seriesSize = Math.min(Math.max(seriesSize, FourierRenderer.MIN_SERIES_SIZE), FourierRenderer.MAX_SERIES_SIZE);
  }

  private unitToPixel(unit: number): number;
  private unitToPixel(point: Point): Point;
  private unitToPixel(point: Point | number): Point | number {
    if (typeof point === 'number') {
      return point * this.scale;
    } else {
      return { x: point.x * this.scale, y: point.y * this.scale };
    }
  }

  private pixelToUnit(pixel: number): number;
  private pixelToUnit(point: Point): Point;
  private pixelToUnit(point: Point | number): Point | number {
    if (typeof point === 'number') {
      return point / this.scale;
    } else {
      return { x: point.x / this.scale, y: point.y / this.scale };
    }
  }

  private clearCanvas() {
    this.ctx.fillStyle = 'black';
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  private drawGrid() {
    // Draw unit grid around the center
    const center = this.unitToPixel(this.center);
    const width = this.ctx.canvas.width;
    const height = this.ctx.canvas.height;
    const unitSize = this.scale;
    const numLines = Math.floor(width / unitSize) + 1;
    const verticalOffset = numLines % 2 === 1 ? height % unitSize / 2 : height % unitSize / 2 - unitSize / 2;

    this.ctx.strokeStyle = 'white';
    this.ctx.lineWidth = 0.3;

    for (let i = 0; i <= numLines; i++) {
      const xPos = i * unitSize;
      // Draw vertical line
      this.ctx.beginPath();
      this.ctx.moveTo(xPos, 0);
      this.ctx.lineTo(xPos, height);
      this.ctx.stroke();

      // Draw horizontal line
      this.ctx.beginPath();
      this.ctx.moveTo(0, xPos + verticalOffset);
      this.ctx.lineTo(width, xPos + verticalOffset);
      this.ctx.stroke();
    }
  }

  private drawCircles() {

  }

  private drawLines() {

  }

  private drawPoint() {

  }

  private drawTrail() {

  }

  private drawLine(start: Point, end: Point) {
    const startPixels = this.unitToPixel(start);
    const endPixels = this.unitToPixel(end);
    this.ctx.beginPath();
    this.ctx.moveTo(startPixels.x, startPixels.y);
    this.ctx.lineTo(endPixels.x, endPixels.y);
    this.ctx.stroke();
  }
}

export class PathDrawer {
  segments: any[] = [];

  onMouseDown() {
  }

  onMouseMove() {
  }

  onMouseUp() {
  }
}