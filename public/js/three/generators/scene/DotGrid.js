var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
  
var DotGrid = function (theatre) {
  var scene = theatre.scene;
  var timeline = theatre.timeline;
  var scopes = theatre.data.scopes;
  var maxSize = theatre.composite.maxSize;

  var dotSteps = maxSize / timeline.length;
  for (var key in scopes){
    var dotX = scopes[key];
    for (var i = 0; i < timeline.length; i++){
      var options = {
        scale: constants.size.dot,
        x: dotX,
        z: dotSteps * i
      };

      scene.add( Dot(options) );
    }
  }
};

var Dot = function (options) {
  options = utils.checkDefaults(options);

  var z = options.z;
  var x = options.x;

  particle = new THREE.Sprite();
  particle.position.x = options.x;
  particle.position.y = options.y;
  particle.position.z = options.z;
  particle.grayness = constants.color.materialGrayness;
  particle.scale.x = particle.scale.y = options.scale;
  return particle;
};

module.exports = DotGrid;