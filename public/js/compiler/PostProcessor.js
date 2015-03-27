var Promise = require('bluebird');
var extractScopes = require('./utils/ExtractScopes');


var PostProcessor = function (resolution) {

  return new Promise (function (resolve, reject) {

    var timeline = parseTimeline(resolution.data);
    var scopes = extractScopes(resolution.data);

    resolution.data.timeline = timeline;
    resolution.data.scopes = scopes;

    resolve(resolution);
  })

}

module.exports = PostProcessor;



function parseTimeline (data) {
  var components = data.components;
  var timeline = [];

  data.programSteps.forEach(function (step, index, programSteps) {
    var element = {};
    element.index = index;

    for (var key in step) {
      if (key !== 'component') {
        element[key] = step[key];
      }
    }

    var component = components[step.id]
    for (var key in component) {
      element[key] = component[key];
    }

    if (step.hasOwnProperty('pointer')) {
      element.pointsTo = components[step.pointer];
    }


    timeline.push(element);
  })
  return timeline;
};






