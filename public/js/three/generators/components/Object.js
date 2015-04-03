var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var ObjectComponent = function (composite, timelineElement) {
  var position = utils.checkDefaults(timelineElement.position);

  var geometry = Object.create(geometries.objectDeclaration);
  var grayness = 0.9;
  var material=new THREE.MeshBasicMaterial({});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );

  object.grayness = grayness;
  object.componentData = timelineElement;
  object.componentData.primary = true;
  object = utils.tweenify(object,{z1:position.z1, z2:position.z2, x1:position.x1, x2:position.x2} );
    
  object.position.set( position.x1, 0, position.z1 );
  composite.add(object);
  
  var curve = new THREE.EllipseCurve(
    position.x1,  0,            // ax, aY
    100, 100,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 50 ) );
  var geometry = path.createPointsGeometry( 50 );
  var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
  
  // Create the final Object3d to add to the scene
  var ellipse = new THREE.Line( geometry, material );
  ellipse.componentData = timelineElement;
  ellipse.grayness = grayness;
  ellipse = utils.tweenify(ellipse,{z1:position.z1, z2:position.z2, x1:position.x1, x2:position.x2} );
  
  ellipse.position.set( position.x1, 0, position.z1 );
  ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({x:2 * Math.PI},6000).repeat(Infinity).start();
  
  composite.add(ellipse);
      
  var curve = new THREE.EllipseCurve(
    position.x1,  0,            // ax, aY
    75, 75,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 50 ) );
  var geometry = path.createPointsGeometry( 50 );
  var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
  
  var ellipse = new THREE.Line( geometry, material );
  ellipse.componentData = timelineElement;
  ellipse.grayness = grayness;
  ellipse = utils.tweenify(ellipse,{z1:position.z1, z2:position.z2, x1:position.x1, x2:position.x2} );
  ellipse.position.set( position.x1, 0, position.z1 );
  ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},3000).repeat(Infinity).start();
  
  composite.add(ellipse);
};

module.exports = ObjectComponent;