var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Property = function (composite, timelineElement) {

  var position = utils.checkDefaults(timelineElement.position);
  
  var curve = new THREE.EllipseCurve(
    position.x1,  0,   // ax, aY
    50, 50,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 50 ) );
  var geometry = path.createPointsGeometry( 50 );
  var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
  
  // Create the final Object3d to add to the scene
  var ellipse = new THREE.Line( geometry, material );
  ellipse = utils.tweenify(ellipse,{z1:position.z1, z2:position.z2, x1:position.x1, x2:position.x2} );
  
  ellipse.position.set( timelineElement.position.x1, 0, timelineElement.position.z1 );
  ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({x:2*Math.PI},6000).repeat(Infinity).start();
  
  composite.add(ellipse);
};

module.exports = Property;