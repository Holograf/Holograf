var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Timelight = function (composite) {
  var material = new THREE.MeshBasicMaterial( { color: constants.color.timelight, transparent:true, opacity:0 } )
  var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 20, 0, 0 ), material );
  var pointLight = new THREE.PointLight( constants.color.timelight, 2 );
  particleLight.add( pointLight );

  particleLight.name = 'timelight';
  return particleLight;
};

module.exports = Timelight;