var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
var addToComposite = require('./AddToComposite');

var ArrayElement = function (composite, timelineElement) {

  if (timelineElement.pointsTo) {
    // TODO: Handle nested arrays / arrays with objects
  } else {
    var grayness = constants.color.grayness;
    var boxContainer = new THREE.Object3D();

    var geometry = Object.create(geometries.arrayIndex);
    var material = new THREE.MeshBasicMaterial({transparent: true});
    var box = new THREE.Mesh(geometry, material );
    box.material.color.setRGB( grayness, grayness, grayness );

    var outline = new THREE.BoxHelper( box );
    outline.grayness = grayness;
    outline.material.color.setRGB( grayness, grayness, grayness );

    boxContainer.add( outline );

    var geometry = Object.create(geometries.variable);
    var material = new THREE.MeshLambertMaterial({});
    material.color.setRGB( grayness, grayness, grayness );
    var value = new THREE.Mesh(geometry, material );
    value.grayness = grayness;

    boxContainer.add( value );

    addToComposite( composite, boxContainer, timelineElement );

  }

};

module.exports = ArrayElement;