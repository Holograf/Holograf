var Promise = require('bluebird');
var extractScopes = require('./utils/ExtractScopes');
var setRenderProperties = require('./postProcessor/RenderProperties');
var populateTimeline = require('./postProcessor/PopulateTimeline');
var setPositions = require('./postProcessor/setPositions');


var PostProcessor = function (resolution) {

  return new Promise (function (resolve, reject) {

    populateTimeline(resolution.data)
      .then(setRenderProperties)
      .then(setPositions)

    var scopes = extractScopes(resolution.data);

    resolution.data.scopes = scopes;


    console.log(resolution.data.timeline);
    resolve(resolution);
  })

}

module.exports = PostProcessor;

