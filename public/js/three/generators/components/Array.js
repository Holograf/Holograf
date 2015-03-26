var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var ArrayComponent = function(composite, opts) {
  options = utils.checkDefaults(options);
  var geometry = Object.create(geometries.functionDeclaration);
  var grayness = 0.5;
  var material=new THREE.MeshBasicMaterial({});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );

  object.grayness=grayness;
  object.componentData=opts.componentData;
  object.componentData.primary=true;
  object=utils.tweenify(object,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
    
  object.position.set( opts.x1, 0, opts.z1 );
  composite.add(object);
  
  var curve = new THREE.EllipseCurve(
    opts.x1,  0,            // ax, aY
    100, 100,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 4 ) );
  var geometry = path.createPointsGeometry( 4 );
  var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
  
  // Create the final Object3d to add to the scene
  var ellipse = new THREE.Line( geometry, material );
  ellipse.componentData=opts.componentData;
  ellipse.grayness = grayness;
  ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
  
  ellipse.position.set( opts.x1, 0, opts.z1 );
  ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},6000).repeat(Infinity).start();
  
  composite.add(ellipse);
      
  var curve = new THREE.EllipseCurve(
    opts.x1,  0,            // ax, aY
    75, 75,           // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 4 ) );
  var geometry = path.createPointsGeometry( 4 );
  var ellipse = new THREE.Line( geometry, material );
  ellipse.componentData = opts.componentData;
  ellipse.grayness = grayness;
  ellipse = utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
  ellipse.position.set( opts.x1, 0, opts.z1 );
  ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},3000).repeat(Infinity).start();
  
  composite.add(ellipse);
};

module.exports = ArrayComponent;