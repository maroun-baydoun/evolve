import * as Util from "./util";

function Bug(x, y, width, height, color, gender) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
  this.color = color;
  this.gender = gender;
  this.age = 0;

  this.fitness = function (color) {
    const {r, g, b} = color;
    return (
      (1 /
        Math.sqrt(
          Math.pow(this.color.r - r, 2) +
          Math.pow(this.color.g - g, 2) +
          Math.pow(this.color.b - b, 2)
        )) *
      1000
    );
  },

  this.mateWith = function (mate) {
    if((this.gender == mate.gender) || this.age < Bug.MATING_AGE || mate.age < Bug.MATING_AGE) {
      return;
    }
   
    const random = Util.random(0, 100);

    const color = {
      r: random % 3 === 0 ? this.color.r : mate.color.r,
      g: random % 3 === 0 ? this.color.g : mate.color.g,
      b: random % 3 === 0 ? this.color.b : mate.color.b,
    };

    const gender =
          Util.random(1, 100) % 2 === 0 ? Bug.GENDER_MALE : Bug.GENDER_FEMALE;

    return new Bug(0, 0, this.width, this.height, color, gender);
  },

  this.mutate = function () {
    const value = Util.random(1, 255);
    const random = Util.random(1, 500);

    if (random % 6 === 0) {
      this.color.r = value;
    } else if (random % 7 === 0) {
      this.color.g = value;
    }
    if (random % 8 === 0) {
      this.color.b = value;
    }
  },

  this.draw = function (context) {
    context.fillStyle =
        "rgb(" + this.color.r + "," + this.color.g + "," + this.color.b + ")";
    context.fillRect(this.x, this.y, this.width, this.height);

    context.lineWidth = 1;
    context.strokeStyle = "black";
    context.strokeRect(this.x, this.y, this.width, this.height);
  };
}

Bug.DEFAULT_WIDTH = 10;
Bug.DEFAULT_HEIGHT = 10;
Bug.GENDER_MALE = 0;
Bug.GENDER_FEMALE = 1;
Bug.MATING_AGE = 5;

export default Bug;
