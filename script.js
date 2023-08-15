import {fourierAnimation} from "./src/fourier.js";
import {boidAnimation} from "./src/boids.js";

const fourierEvent = new Event("startFourier");
var fourierStarted = false;
const boidsEvent = new Event("startBoids");
const fluidEvent = new Event("startFluid");
const lilaEvent = new Event("startLila");
const graphicsEvent = new Event("startGraphics");

//Main title typing animation
window.addEventListener("loadBG", (event) => {
  var typed = new Typed(".auto-type", {
    strings: ["Hi...<br>^500My name is Matthias...<br>^500I'm a computer science student."],
    typeSpeed: 30,
    contentType: "html"
  })
});

document.addEventListener("startFourier", (event)=>{
  var typedFourier = new Typed(".type-fourier-title", {
    strings: ["Project 1: ^500Fourier Drawings"],
    typeSpeed: 30,
    contentType: "html"
  });
  var typedFourierAbout = new Typed(".type-fourier-explanation", {
    strings: ["`Inspired by a 3blue1brown video, I decided to create my own interactive visualisation of Fourier series.`<br>^200 `This program can take any svg composed of a single closed path as an input, and determine the coefficients of a complex Fourier series that approximates the image.`<br>^200 `<mark>Try clicking and dragging to draw new shapes!</mark>`"],
    typeSpeed: 70,
    contentType: "html",
    startDelay: 2500,
    showCursor: false
  })
  var typedFourierContinue = new Typed(".type-fourier-continue", {
    strings: ["Continue"],
    typeSpeed: 30,
    contentType: "html",
    startDelay: 4000,
    showCursor: false
  })
  typedFourierContinue.onComplete = {
    showCursor: false
  }
});

document.getElementById("fourier-continue").onclick = () => {
  document.getElementById("fourier-intro").classList.toggle("hidden");
  const fourierAnim = new fourierAnimation();
  window.addEventListener("resize", fourierAnim.resizeCanvas.bind(fourierAnim), false);
}

document.addEventListener("startBoids", (event)=>{
  var typedBoids = new Typed(".type-boids-title", {
    strings: ["Project 2: ^500Boids Simulation"],
    typeSpeed: 30,
    contentType: "html"
  });
  var typedBoidsAbout = new Typed(".type-boids-explanation", {
    strings: ["`I have long been fascinated by visual simulations of natural phenomena, espacially when simple rules lead to complex behavior.`<br>^200 `Here is an example of that: each individual boid (bird-oid) follows four rules: coherence, seperation, constant speed, and avoiding boundaries.`<br>^200 `This behavior can be seen in flocks of birds, swarms of insects, and schools of fish. It allows them to make decisions as a group and avoid predators.`<br>^200 `I therefore added a predator type in order to experiment with predation mechanics, and added food so the flock would replenish (try clicking the canvas :))`<br>^200 `I did this project in order to teach myself how to use the js canvas.`"],
    typeSpeed: 70,
    contentType: "html",
    startDelay: 2500,
    showCursor: false
  })
  var typedBoidsContinue = new Typed(".type-boids-continue", {
    strings: ["Continue"],
    typeSpeed: 30,
    contentType: "html",
    startDelay: 4000,
    showCursor: true
  })
  typedBoidsContinue.onComplete = {
    showCursor: false
  }
});

document.getElementById("boids-continue").onclick = () => {
  document.getElementById("boids-intro").classList.toggle("hidden");
  const boidAnim = new boidAnimation();
  window.addEventListener("resize", boidAnim.sizeCanvas.bind(boidAnim), false);
}

document.addEventListener("startFluid", (event)=>{
  var typedFluid = new Typed(".type-fluid-title", {
    strings: ["Project 3: ^500Fluid Simulation"],
    typeSpeed: 30,
    contentType: "html"
  });
  var typedFluidAbout = new Typed(".type-fluid-explanation", {
    strings: ["`inspired by ... I decided to delve into the domain of fluid dynamics. A mistake that I will never make again.`<br>^200 `This simulation is based on smoothed-particle hydrodynamics. The set of equations used makes this simulation very sensitize to it's inital parameters.`<br>^200 `As an artistic touch, I decided to render the simulation as ASCII art and make it interactive. Try typing!`"],
    typeSpeed: 70,
    contentType: "html",
    startDelay: 2500,
    showCursor: false
  })
  var typedFluidContinue = new Typed(".type-fluid-continue", {
    strings: ["Continue"],
    typeSpeed: 30,
    contentType: "html",
    startDelay: 4000,
    showCursor: true
  })
  typedFluidContinue.onComplete = {
    showCursor: false
  }
});

document.getElementById("fluid-continue").onclick = () => {
  document.getElementById("fluid-intro").classList.toggle("hidden");
}

document.addEventListener("startLila", (event)=>{
  var typedFluid = new Typed(".type-lila-title", {
    strings: ["Work in progress: ^500Photography portofolio for Presse Agrume"],
    typeSpeed: 30,
    contentType: "html"
  });
});

document.addEventListener("startGraphics", (event)=>{
  var typedFluid = new Typed(".type-graphics-title", {
    strings: ["Project 4: ^500Graphics Engine from scratch"],
    typeSpeed: 30,
    contentType: "html"
  });
  var typedFluidAbout = new Typed(".type-graphics-explanation", {
    strings: ["`inspired by ... I decided to delve into the domain of fluid dynamics. A mistake that I will never make again.`<br>^200 `This simulation is based on smoothed-particle hydrodynamics. The set of equations used makes this simulation very sensitize to it's inital parameters.`<br>^200 `As an artistic touch, I decided to render the simulation as ASCII art and make it interactive. Try typing!`"],
    typeSpeed: 70,
    contentType: "html",
    startDelay: 2500,
    showCursor: false
  })
  var typedFluidContinue = new Typed(".type-graphics-continue", {
    strings: ["Continue"],
    typeSpeed: 30,
    contentType: "html",
    startDelay: 4000,
    showCursor: true
  })
  typedFluidContinue.onComplete = {
    showCursor: false
  }
});

document.getElementById("graphics-continue").onclick = () => {
  document.getElementById("graphics-intro").classList.toggle("hidden");
  document.getElementById("graphics-iframe").src = "./graphinsa-main/index.html";
}

//switch section 1 to 3 and vice versa on scroll
document.addEventListener("scroll", (event)=>{
  let scroll = window.scrollY;
  if (scroll >= window.innerHeight) {
    if (!fourierStarted){
      fourierStarted = true;
      document.dispatchEvent(fourierEvent);
    }
    section3.style.zIndex = 2;
  } else if (scroll < window.innerHeight) {
    section3.style.zIndex = 0;
  }
})

//Using glide.js to implement carousel with projects  
var glideHero = new Glide('.glide', {
  type: 'slide',
  startAt: 0,
  perView: 1,
  focusAt: "center",
  keyboard: true,
  swipeThreshold: false,
  dragThreshold: false
});
glideHero.mount();


//Contact box popup
var popup = document.getElementById("contact-popup");
var shown = false;

popup.style.visibility = "hidden"; //hide box on page load)

window.showPopup = () =>{
  if (!shown){
    shown = true;
    popup.style.visibility = "visible";

    //trigger reflow
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = null; 

    popup.style.animation = "fadeIn 1s";
  } else {
    shown = false;

    //trigger reflow
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = null; 
    
    popup.style.animation = "reverse fadeIn 1s";
    //event listener detects animation finish and hides div
  }
}

popup.addEventListener("animationend", ()=>{
  if (!shown) {
    popup.style.visibility="hidden";
  }
})

glideHero.on(['mount.after', 'run'], () => {
  const currentIndex = glideHero.index;
  if (currentIndex == 1){
    document.dispatchEvent(boidsEvent);
  } else if (currentIndex == 2){
    document.dispatchEvent(fluidEvent);
  } else if (currentIndex == 4){
    document.dispatchEvent(lilaEvent);
  } else if (currentIndex == 3){
    document.dispatchEvent(graphicsEvent);
  }
 });

window.addEventListener("loadBG", (event) => {
  document.getElementById("load-screen").classList.toggle("hidden");
});

window.addEventListener("resize", (event) => {
  document.getElementById("graphics-iframe").height = document.getElementById("graphics-container").clientHeight;
  document.getElementById("graphics-iframe").width = document.getElementById("graphics-container").clientWidth;
});

console.log()
document.getElementById("graphics-iframe").height = document.getElementById("graphics-container").clientHeight;
document.getElementById("graphics-iframe").width = document.getElementById("graphics-container").clientWidth;