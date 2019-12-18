import Geneticalgorithm from "geneticalgorithm";
import "../style.css";

import {
  GROUND_COLOR,
  createInitialPopulation,
  crossoverFunction,
  fitnessFunction,
  mutationFunction,
} from "./genetic";

import { draw, drawGround } from "./canvas";

const canvas = window.document.getElementById("canvas");
const context = canvas.getContext("2d");
context.translate(0.5, 0.5);

const startButton = window.document.getElementById("start");
const stopButton = window.document.getElementById("stop");
let timeOut;

startButton.addEventListener("click", function () {
  this.disabled = true;
  stopButton.disabled = false;
  const initialPoulation = createInitialPopulation(100, canvas.width, canvas.height);

  const geneticalgorithm = Geneticalgorithm({
    population: initialPoulation,
    populationSize: 100,
    crossoverFunction: crossoverFunction(canvas.width,  canvas.height),
    fitnessFunction,
    mutationFunction,
  });

  function evolve() {
    const bugs = geneticalgorithm.evolve().population();
    draw(context, canvas.width, canvas.height, GROUND_COLOR, bugs);

    timeOut = window.setTimeout(evolve, 1000);
  }

  evolve();

});

stopButton.addEventListener("click", function () {
  this.disabled = true;
  startButton.disabled = false;

  window.clearTimeout(timeOut);
  draw(context, canvas.width, canvas.height, GROUND_COLOR, []);
});


drawGround(context, canvas.width, canvas.height, GROUND_COLOR);

