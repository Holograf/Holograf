var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
  
var DotGrid = function (theatre) {
  var scene = theatre.scene;
  var timeline = theatre.timeline;
  var scopes = theatre.data.scopes;
  
  var maxSize = theatre.maxSize;
  var dotSteps = maxSize / timeline.length;

  for (var key in scopes){
    var dotZ = scopes[key] * constants.size.scope;

    for (var i = 0; i < timeline.length; i++){
      scene.add( Dot({
          scale: constants.size.dot,
          x: dotSteps * i,
          z: dotZ
        }) 
      );
    }
  }
};

var Dot = function (options) {
  options = utils.checkDefaults(options);

  particle = new THREE.Sprite();
  particle.position.x = options.x;
  particle.position.z = options.z;

  particle.grayness = constants.color.materialGrayness;
  particle.scale.x = particle.scale.y = options.scale;
  return particle;
};

module.exports = DotGrid;