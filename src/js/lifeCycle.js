import * as Util from "./util";
import Bug from "./bug";

var LifeCycle = {
  groundColor: { r: 10, g: 255, b: 50 },
  generationDelay: 500,
  bugs: [],
  generationCount: 0,
  createInitialPopulation: function(size, areaWidth, areaHeight) {
    for (var i = 0; i < size; i++) {
      var x = Util.random(0, areaWidth - Bug.DEFAULT_WIDTH);
      var y = Util.random(0, areaHeight - Bug.DEFAULT_HEIGHT);

      var gender =
        Util.random(1, 100) % 2 === 0 ? Bug.GENDER_MALE : Bug.GENDER_FEMALE;

      var bug = new Bug(
        x,
        y,
        Bug.DEFAULT_WIDTH,
        Bug.DEFAULT_WIDTH,
        {
          r: Util.random(0, 255),
          g: Util.random(0, 255),
          b: Util.random(0, 255)
        },
        gender
      );

      this.bugs.push(bug);
    }
  },
  start: function() {
    this.generationCount = 1;
  },
  generation: function() {
    let length = this.bugs.length;

    var random = Util.random(1, 100);

    if (random % 5 === 0) {
      random = Util.random(0, length);

      const bug = this.bugs[random];

      if (bug) {
        bug.mutate();
      }
    }

    this.bugs.sort(function(bug1, bug2) {
      const fitness1 = bug1.fitness(LifeCycle.groundColor);
      const fitness2 = bug2.fitness(LifeCycle.groundColor);

      if (fitness1 > fitness2) return -1;
      if (fitness1 < fitness2) return 1;

      return 0;
    });

    for (let i = 0; i < length; i++) {
      var bug = this.bugs[i];

      bug.age++;

      if (this.generationCount >= 10 && this.generationCount % 5 === 0) {
        const bugsToRemove = Math.floor(this.bugs.length * 0.01);
        this.bugs.splice(length - bugsToRemove, bugsToRemove);

        length = this.bugs.length;
        continue;
      }

      if (bug.age >= LifeCycle.BUG_MAX_AGE) {
        this.bugs.splice(i, 1);

        length--;
        continue;
      }

      if (this.bugs.length < 1000) {
        if (
          i === 0 ||
          (i <= length / 2 && this.generationCount % 2 === 0) ||
          (i > length / 2 && this.generationCount % 4 === 0)
        ) {
          const j = Util.random(0, length / 2 + 1);

          if (j !== i) {
            const otherBug = this.bugs[j];

            if (otherBug) {
              const child = bug.mateWith(otherBug);

              if (child) {
                child.x = Util.random(0, 500 - Bug.DEFAULT_WIDTH);
                child.y = Util.random(0, 500 - Bug.DEFAULT_HEIGHT);

                this.bugs.push(child);
              }
            }
          }
        }
      }
    }

    this.generationCount++;
  },

  reset: function() {
    this.generationCount = 0;
    this.bugs = [];
  }
};

LifeCycle.BUG_MAX_AGE = 40;
LifeCycle.COMPETITITVE_EDGE = 20;

export default LifeCycle;
