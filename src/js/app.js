import LifeCycle from "./lifeCycle";

import "../style.css";


const canvas = window.document.getElementById("canvas");
const context = canvas.getContext("2d");

const startButton = window.document.getElementById("start");
const stopButton = window.document.getElementById("stop");

let timeOut = null;

startButton.addEventListener("click", function () {
  this.disabled = "disabled";
  stopButton.removeAttribute("disabled");

  LifeCycle.createInitialPopulation(300, 500, 500);
  LifeCycle.start();

  cycle();
});

stopButton.addEventListener("click", function () {
  this.disabled = "disabled";
  startButton.removeAttribute("disabled");

  window.clearTimeout(timeOut);

  LifeCycle.reset();

  draw();
});

function cycle() {
  LifeCycle.generation();

  draw();

  timeOut = window.setTimeout(() => {
    cycle();
  }, LifeCycle.generationDelay);
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  const { r, g, b } = LifeCycle.groundColor;

  const color = `rgb(${r} ,${g} ,${b})`;

  context.fillStyle = color;
  context.fillRect(0, 0, 500, 500);

  for (let i = 0; i < LifeCycle.bugs.length; i++) {
    const bug = LifeCycle.bugs[i];

    bug.draw(context);
  }
}

draw();
