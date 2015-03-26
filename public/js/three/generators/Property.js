var utils = require('../utils');
var geometries = require('../Geometries');
var constants = require('../Constants');

var Property = function (composite, options) {

  // copy obj to set primary to false and avoid them as you move through timeline nodes
  options.componentData = JSON.parse(JSON.stringify(options.componentData));
  options.componentData.primary = false;

  options = utils.checkDefaults(options);
  
  var curve = new THREE.EllipseCurve(
    options.x1,  0,   // ax, aY
    50, 50,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 50 ) );
  var geometry = path.createPointsGeometry( 50 );
  var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
  
  // Create the final Object3d to add to the scene
  var ellipse = new THREE.Line( geometry, material );
  ellipse.componentData = options.componentData;
  ellipse=utils.tweenify(ellipse,{z1:options.z1, z2:options.z2, x1:options.x1, x2:options.x2} );
  
  ellipse.position.set( options.x1, 0, options.z1 );
  ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({x:2*Math.PI},6000).repeat(Infinity).start();
  
  composite.add(ellipse);
};

module.exports = Property;