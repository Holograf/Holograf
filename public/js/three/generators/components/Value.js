var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
var addToComposite = require('./AddToComposite');

var generate = {};
generate.property = require('./Property');
generate.element = require('./Element');
generate.label = require('./Label');


var Value = function(composite, timelineElement){

  var grayness = constants.color.materialGrayness;
  var geometry = Object.create(geometries.variable);
  var material = new THREE.MeshLambertMaterial({});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );
  object.grayness = grayness;

  addToComposite(composite, object, timelineElement);
  
  // if (timelineElement.type === 'property'){
  //   generate.property(composite, timelineElement);
  // } else if (timelineElement.type === 'element'){
  //   generate.element(composite, timelineElement);
  // }
  
  // if (component.value !== undefined){
  //   generate.label(composite, component);
  // }
};

module.exports = Value;