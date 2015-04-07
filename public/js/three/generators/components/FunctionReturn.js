var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
var addToComposite = require('./AddToComposite');

var FunctionReturn = function (composite, timelineElement) {
  
  var grayness = constants.color.grayness;
  var geometry = Object.create(geometries.functionInvocation);
  var material = new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );
  object.grayness = grayness;

  addToComposite(composite, object, timelineElement);
  object.rotation.z = (Math.PI / 2);
};

module.exports = FunctionReturn;