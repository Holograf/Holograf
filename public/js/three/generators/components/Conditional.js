var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
var addToComposite = require('./AddToComposite');

var Conditional = function (composite, timelineElement) {
  if (timelineElement.display.rendered) {

    var grayness = constants.color.grayness;
    var material = new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
    material.color.setRGB( grayness, grayness, grayness );
    
    if (timelineElement.if === 'open') {
      var geometry = Object.create(geometries.conditionalBranch.open);
      var object = new THREE.Mesh(geometry, material );

      object.rotation.x = Math.PI / 2;
      object.rotation.z = Math.PI; 
    } 

    else if (timelineElement.if === 'close') {
      var geometry = Object.create(geometries.conditionalBranch.close);
      var object = new THREE.Mesh(geometry, material );

      object.rotation.x = Math.PI / 2;
    } 

    else {
      var geometry = Object.create(geometries.conditionalBranch);
      var object = new THREE.Mesh(geometry, material );  
    }
    
    object.grayness = grayness;
    addToComposite(composite, object, timelineElement);
  }
};

module.exports = Conditional;