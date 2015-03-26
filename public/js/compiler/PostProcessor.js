var Promise = require('bluebird');


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
  var timeline = data.programSteps.map(function (step, index, programSteps) {
    step.component = {};
    step.component.timelineIndex = index;

    for (var key in step) {
      if (key !== 'component') {
        step.component[key] = step[key];
      }
    }

    var component = components[step.id];
    for (var key in component) {
      step.component[key] = component[key];
    }

    if (step.hasOwnProperty('pointer')) {
      step.component.pointsTo = components[step.pointer];
    }
    return step;
  })
  return timeline;
};


function extractScopes (data) {
  var scopes = {'-1': 0};
  var scopeX = 500;
  
  var countLevels = function(key, levels) {
    levels = levels || 1;
    var scope = data.components[key].scope;
    if (scope === 0) {
      return levels;
    }
    levels++;
    return countLevels(scope, levels);
  }

  for (var key in data.scopes){
    if (key !== '0') {
      level = countLevels(key);
      if (!scopes[level]) {
        scopes[level] = scopeX;
        scopeX += 500;
      }
    }
  }
  return scopes;
};