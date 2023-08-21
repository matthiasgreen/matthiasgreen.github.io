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
  //auto type intro screens
  switch (projectIndex) {
    case 0:
      if (!visited.includes(0)) {
        visited.push(0);
        var typedFourier = new Typed(".type-fourier-title", {
          strings: ["`>> `^500Project 1: ^500Fourier Drawings"],
          typeSpeed: 30,
          contentType: "html",
          onComplete: function (self) {
            self.cursor.remove();
          }
        });
        var typedFourierAbout = new Typed(".type-fourier-explanation", {
          strings: ["`Inspired by a 3blue1brown video, I decided to create my own interactive visualisation of Fourier series.`<br>^200 `This program can take any svg composed of a single closed path as an input, and determine the coefficients of a complex Fourier series that approximates the image.`<br>^200 `<mark>Try clicking and dragging to draw new shapes!</mark>`"],
          typeSpeed: 70,
          contentType: "html",
          startDelay: 2700,
          showCursor: false
        })
        var typedFourierContinue = new Typed(".type-fourier-continue", {
          strings: ["`>> `^500Continue"],
          typeSpeed: 30,
          contentType: "html",
          startDelay: 4000,
          cursorChar: '',
          preStringTyped: function (arraypos, self) {
            var cursor = document.createTextNode("|");
            self.cursor.appendChild(cursor);
          }
        })
      }
      break;
    case 3:
      if (!visited.includes(3)) {
        visited.push(3);
        var typedBoids = new Typed(".type-boids-title", {
          strings: ["Project 4: ^500Boids Simulation"],
          typeSpeed: 30,
          contentType: "html"
        });
        var typedBoidsAbout = new Typed(".type-boids-explanation", {
          strings: ["`I have long been fascinated by visual simulations of natural phenomena, espacially when simple rules lead to complex behavior.`<br>^200 `Here is an example of that: each individual boid (bird-oid) follows four rules: coherence, seperation, constant speed, and avoiding boundaries.`<br>^200 `This behavior can be seen in flocks of birds, swarms of insects, and schools of fish. It allows them to make decisions as a group and avoid predators.`<br>^200 `I therefore added a predator type in order to experiment with predation mechanics, and added food so the flock would replenish <mark>(try clicking the canvas)</mark>`"],
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
    case 1:
      if (!visited.includes(1)) {
        visited.push(1);
        var typedFluid = new Typed(".type-fluid-title", {
          strings: ["Project 2: ^500Fluid Simulation"],
          typeSpeed: 30,
          contentType: "html"
        });
        var typedFluidAbout = new Typed(".type-fluid-explanation", {
          strings: ["`Inspired by the youtube video ASCII fluid dynamics, I decided to delve into the domain of fluid dynamics, a mistake that I will never make again.`<br>^200 `This simulation is based on smoothed-particle hydrodynamics. The set of equations used makes this simulation very sensitize to it's inital parameters.`<br>^200 `As an artistic touch, I decided to render the simulation as ASCII art and make it interactive. <mark>Try typing!</mark>`"],
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
    case 2:
      if (!visited.includes(2)) {
        visited.push(2);
        var typedFluid = new Typed(".type-graphics-title", {
          strings: ["Project 3: ^500Graphics Engine From Scratch"],
          typeSpeed: 30,
          contentType: "html"
        });
        var typedFluidAbout = new Typed(".type-graphics-explanation", {
          strings: ["`This project originated as a university project. Me and my groupmate decided to choose the creation of a 3d grapics engine as our subject.`<br>^200 `We settled on using javascript as our language of choice in order to have the engine be interactive and available online`<br>^200 `We implemented a simple shading system and basic optimization, although the program is very limited due to not using the graphics card`<br>^200 `<mark>Try clicking and dragging to move the camera !</mark>`"],
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
    case 3:
      fourierAnim.pause = true;
      boidsAnim.pause = false;
      fluidAnim.pause = true;
      document.getElementById("graphics-iframe").src = "";
    break;
    case 1:
      fourierAnim.pause = true;
      boidsAnim.pause = true;
      fluidAnim.pause = false;
      document.getElementById("graphics-iframe").src = "";
    break;
    case 2:
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
    strings: ["Hi...<br>^500My name is Matthias...<br>^500Welcome to my portofolio."],
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
  if (scroll >= window.innerHeight-2) { //-2 buffer for edge
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
var popupContent = document.getElementsByClassName("popup-contents");
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

    popup.style.animation = "unfoldIn 1s";

    for (let element of popupContent) {
      //trigger reflow
      element.style.animation = 'none';
      element.offsetHeight;
      element.style.animation = null; 

      element.style.animation = "fadeIn 1.5s";
    }
  } else {
    shown = false;

    //trigger reflow
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = null; 
    
    popup.style.animation = "reverse unfoldIn 1s";
    //event listener detects animation finish and hides div
    for (let element of popupContent) {
      //trigger reflow
      element.style.animation = 'none';
      element.offsetHeight;
      element.style.animation = null; 
      
      element.style.animation = "reverse fadeIn 1.5s";
    }
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

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

if (window.mobileCheck()) {
  const parent = document.getElementById("root")
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  var mess = document.createTextNode("Mobile site not available yet, sorry");
  parent.appendChild(mess);
}