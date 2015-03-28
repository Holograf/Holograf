var Promise = require('bluebird');


var PopulateTimeline = function (data) {

  return new Promise (function (resolve, reject) {
    var components = data.components;

    data.timeline.forEach(function (step, index, timeline) {

      var timelineElement = {};

      for (var key in step) {
        timelineElement[key] = step[key];
      }

      var component = components[step.id]
      for (var key in component) {
        timelineElement[key] = component[key];
      }

      if (step.hasOwnProperty('pointer')) {
        timelineElement.pointsTo = components[step.pointer];
      }

      timeline[index] = timelineElement;
    })

    resolve(data);
  })

}

module.exports = PopulateTimeline;







