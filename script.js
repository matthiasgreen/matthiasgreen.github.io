import {fourierAnimation} from "./src/fourier.js";
import {boidAnimation} from "./src/boids.js";

var graphicsStarted = false;
const projectEvent = new Event("projectSwitch")

var fourierAnim = {};
var boidsAnim = {};
var fluidAnim = {};
var visited = [];

function handleProjectSwitch(event) {
  const projectIndex = glideHero.index;
  var projectNames = ["fourier", "boids", "fluid", "graphics", "lila"];
  //auto type intro screens
  switch (projectIndex) {
    case 0:
      if (!visited.includes(0)) {
        visited.push(0);
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
      }
      break;
    case 1:
      if (!visited.includes(1)) {
        visited.push(1);
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
      }
      break;
    case 2:
      if (!visited.includes(2)) {
        visited.push(2);
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
      }
      break;
    case 3:
      if (!visited.includes(3)) {
        visited.push(3);
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
      }
      break;
    case 4:
      if (!visited.includes(4)) {
        visited.push(4);
        var typedFluid = new Typed(".type-lila-title", {
          strings: ["Work in progress: ^500Photography portofolio for Presse Agrume"],
          typeSpeed: 30,
          contentType: "html"
        });
      }
      break;
  }
  //pause other projects
  switch (projectIndex) {
    case 0:
      fourierAnim.pause = false;
      boidsAnim.pause = true;
      fluidAnim.pause = true;
      document.getElementById("graphics-iframe").src = "";
    break;
    case 1:
      fourierAnim.pause = true;
      boidsAnim.pause = false;
      fluidAnim.pause = true;
      document.getElementById("graphics-iframe").src = "";
    break;
    case 2:
      fourierAnim.pause = true;
      boidsAnim.pause = true;
      fluidAnim.pause = false;
      document.getElementById("graphics-iframe").src = "";
    break;
    case 3:
      fourierAnim.pause = true;
      boidsAnim.pause = true;
      fluidAnim.pause = true;
      if (graphicsStarted) {
        document.getElementById("graphics-iframe").src = "./graphinsa-main/index.html";
      }
    break;
    case 4:
      fourierAnim.pause = true;
      boidsAnim.pause = true;
      fluidAnim.pause = true;
      document.getElementById("graphics-iframe").src = "";
    break;
  }
}
document.addEventListener("projectSwitch", handleProjectSwitch);

//Main title typing animation
window.addEventListener("loadBG", (event) => {
  var typed = new Typed(".auto-type", {
    strings: ["Hi...<br>^500My name is Matthias...<br>^500I'm a computer science student."],
    typeSpeed: 30,
    contentType: "html"
  })
});

document.getElementById("fourier-continue").onclick = () => {
  document.getElementById("fourier-intro").classList.toggle("hidden");
  fourierAnim = new fourierAnimation();
  window.addEventListener("resize", fourierAnim.resizeCanvas.bind(fourierAnim), false);
}

document.getElementById("boids-continue").onclick = () => {
  document.getElementById("boids-intro").classList.toggle("hidden");
  boidsAnim = new boidAnimation();
  window.addEventListener("resize", boidsAnim.sizeCanvas.bind(boidsAnim), false);
}

document.getElementById("fluid-continue").onclick = () => {
  document.getElementById("fluid-intro").classList.toggle("hidden");
  fluidAnim = new fluidAnimation();
}

document.getElementById("graphics-continue").onclick = () => {
  document.getElementById("graphics-intro").classList.toggle("hidden");
  document.getElementById("graphics-iframe").src = "./graphinsa-main/index.html";
  graphicsStarted = true;
}

//switch section 1 to 3 and vice versa on scroll
document.addEventListener("scroll", (event)=>{
  let scroll = window.scrollY;
  if (scroll >= window.innerHeight) {
    document.dispatchEvent(projectEvent);
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

glideHero.on(['mount.after', 'run'], () => {
  document.dispatchEvent(projectEvent);
});

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