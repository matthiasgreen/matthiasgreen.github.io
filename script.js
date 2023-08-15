import {fourierAnimation} from "./fourier.js";
import {boidAnimation} from "./boids.js";

const fourierEvent = new Event("startFourier");
var fourierStarted = false;
const boidsEvent = new Event("startBoids");
const fluidEvent = new Event("startFluid");

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
    strings: ["`Inspired by a 3blue1brown video, I decided to create my own interactive visualisation of Fourier series.`<br>^200 `This program can take any svg composed of a single closed path as an input, and determine the coefficients of a complex Fourier series that approximates the image.`<br>^200 `Try clicking and dragging to draw new shapes!`"],
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
    showCursor: true
  })
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
    strings: ["`I have long been fascinated by visual simulations of natural phenomena, espacially when simple rules lead to complex behavior.`<br>^200",
      "`Here is an example of that: each individual boid (bird-oid) follows four rules: coherence, seperation, constant speed, and avoiding boundaries.`<br>^200",
      "`This behavior can be seen in flocks of birds, swarms of insects, and schools of fish. It allows them to make decisions as a group and avoid predators.`<br>^200",
      "`I therefore added a predator type in order to experiment with predation mechanics, and added food so the flock would replenish (try clicking the canvas :))`<br>^200",
      "`I did this project in order to teach myself how to use the js canvas.`"],
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
});

document.getElementById("boids-continue").onclick = () => {
  document.getElementById("boids-intro").classList.toggle("hidden");
  const boidAnim = new boidAnimation();
  window.addEventListener("resize", boidAnim.sizeCanvas.bind(boidAnim), false);
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
  perView: 1.2,
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
  }
 });



window.onload = () => {

  // Make sure the canvas always fills the whole window
  window.addEventListener("resize", sizeCanvasf, false);
  sizeCanvasf();
  initParticles();

  // Schedule the main animation loop
  window.requestAnimationFrame(animationLoopf);
};

window.addEventListener("loadBG", (event) => {
  document.getElementById("load-screen").classList.toggle("hidden");
});