var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
var addToComposite = require('./AddToComposite');

var Loop = function (composite, timelineElement) {

  var geometry = Object.create(geometries.loop);
  var grayness = constants.color.materialGrayness;
  var material = new THREE.MeshLambertMaterial({});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );

  object.grayness = grayness;   

  addToComposite(composite, object, timelineElement);
  object.rotation.y = (Math.PI / 2);
};

module.exports = Loop;