var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Skybox = function (theatre) {
  var scene = theatre.scene;
  var maxSize = theatre.composite.maxSize;

  var x, y, z;

  var maxSize = maxSize >= 1000 ? maxSize : 1000;
  var interval = maxSize / 5;
  var material = new THREE.LineBasicMaterial( { color: constants.color.skybox } );

  // back horizontal
  y = -maxSize; // +yMod;
  while (y < maxSize) {
    var geometry = new THREE.Geometry();
    z = -2 * maxSize;
    y += interval; 

    geometry.vertices.push( new THREE.Vector3( -maxSize, y, z ) );
    geometry.vertices.push( new THREE.Vector3( 2 * maxSize, y, z  ) );
    
    var line = new THREE.Line( geometry, material );
    scene.add(line);
  }

  // back  & bottom vertical
  x = -maxSize - interval;
  while (x < 2 * maxSize) {
    var geometry = new THREE.Geometry();
    z = -2 * maxSize;
    x += interval; 

    geometry.vertices.push( new THREE.Vector3( x, -maxSize, maxSize));   // +yMod (3)
    geometry.vertices.push( new THREE.Vector3( x, -maxSize, z ) );
    geometry.vertices.push( new THREE.Vector3( x, maxSize, z ) );
    
    var line = new THREE.Line( geometry, material );
    scene.add(line);
  }


  // bottom horizontal
  z = maxSize + interval;
  while (z > -2 * maxSize) {
    var geometry = new THREE.Geometry();
    y = -maxSize;   // +yMod
    z -= interval; 

    geometry.vertices.push( new THREE.Vector3( -maxSize, y, z ) );
    geometry.vertices.push( new THREE.Vector3( 2 * maxSize, y, z ) );
    
    var line = new THREE.Line( geometry, material );
    scene.add(line);
  }
};

module.exports = Skybox;