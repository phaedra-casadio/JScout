(function Profiler() {
  "use strict";

  function Step(start) {

    var startTime = null,
      endTime = null;

    this.isStarted = false;

    this.start = function () {
      startTime = new Date();
      this.isStarted = true;
    };

    this.stop = function (d) {
      endTime = !!d ? d : new Date();
      this.isStarted = false;
    };

    this.getTime = function () {
      if (!startTime) {
        return 0;
      } else if (!endTime) {
        endTime = new Date();
      }

      return endTime - startTime;
    };

    if (start) {
      this.start();
    }
  }

  var steps = [];

  function getRunningStep() {
    if (steps.length > 0
        && steps[steps.length].isStarted) {
      return steps[steps.length];
    }

    return null;
  }

  this.start = function () {
    steps.push(new Step(true));
  };

  this.stop = function () {
    var d = new Date();

    var step = getRunningStep();
    if (step !== null) {
      step.stop(d);
    }
  };

  this.step = function (restart) {
    this.stop();
    this.start(true);
  };

  this.reset = function () {
    steps = null;
  };

  this.getSteps = function() {
    return steps;
  }

  this.getTime = function () {
    this.stop();

    var time;

    for(var i=0; i < steps.length; i++) {
      time += steps[i].getTime();
    }

    return time;
  };

}());