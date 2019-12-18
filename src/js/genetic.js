
const BUG_WIDTH = 10;
const BUG_HEIGHT = 10;
const GROUND_COLOR = { r: 100, g: 255, b: 50 };

function random(min, max) {
  return Math.floor(Math.random() * max + min);
}

function createInitialPopulation(size, areaWidth, areaHeight) {
  return Array(size).fill(0).map(() => ({
    x: random(0, areaWidth - BUG_WIDTH),
    y: random(0, areaHeight - BUG_HEIGHT),
    width: BUG_WIDTH,
    height: BUG_HEIGHT,
    color: {
      r: random(0, 255),
      g: random(0, 255),
      b: random(0, 255)
    },
  }));
}

function crossoverFunction(areaWidth, areaHeight) {
  return function (bug1, bug2) {
    const rand = random(0, 100);

    const child1 = {
      x: random(0, areaWidth - BUG_WIDTH),
      y: random(0, areaHeight - BUG_HEIGHT),
      width: BUG_WIDTH,
      height: BUG_HEIGHT,
      color: {
        r: rand % 3 === 0 ? bug1.color.r : bug2.color.r,
        g: rand % 3 === 0 ? bug1.color.g : bug2.color.g,
        b: rand % 3 === 0 ? bug1.color.b : bug2.color.b,
      },
    };

    const child2 = {
      x: random(0, areaWidth - BUG_WIDTH),
      y: random(0, areaHeight - BUG_HEIGHT),
      width: BUG_WIDTH,
      height: BUG_HEIGHT,
      color: {
        r: rand % 3 === 0 ? bug2.color.r : bug1.color.r,
        g: rand % 3 === 0 ? bug2.color.g : bug1.color.g,
        b: rand % 3 === 0 ? bug2.color.b : bug1.color.b,
      },
    };
    return [child1, child2];
  };
}

function fitnessFunction(bug) {
  const { color } = bug;
  const { r, g, b } = GROUND_COLOR;
  return (
    (1 /
      Math.sqrt(
        Math.pow(color.r - r, 2) +
        Math.pow(color.g - g, 2) +
        Math.pow(color.b - b, 2)
      )) *
    1000
  );
}

function mutationFunction(bug) {
  const value = random(1, 255);
  const rand = random(1, 500);

  if (rand % 6 === 0) {
    return { ...bug, color: { ...bug.color, r: value } };
  } else if (rand % 7 === 0) {
    return { ...bug, color: { ...bug.color, g: value } };
  } else if (rand % 8 === 0) {
    return { ...bug, color: { ...bug.color, b: value } };
  }
  return bug;
}

export {
  GROUND_COLOR,
  createInitialPopulation,
  crossoverFunction,
  fitnessFunction,
  mutationFunction
};
