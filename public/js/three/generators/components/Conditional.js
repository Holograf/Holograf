var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Conditional = function (composite, options) {

  options = utils.checkDefaults(options);

  var x = options.x1;
  var z1 = options.z1;
  var z2 = options.z2;

  var geometry = Object.create(geometries.hexagon);
  var grayness = constants.color.grayness;
  if (options.componentData.if && options.componentData.if==='close'){
    grayness = 0.1;
  }
  var material=new THREE.MeshPhongMaterial({metal:true});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );

  object.grayness=grayness;
  object.componentData=options.componentData;
  object.componentData.primary=true;
  object=utils.tweenify(object,{z1: z1, z2:z2, x1:options.x1, x2:options.x2} );
    
    
  object.rotate=new TWEEN.Tween(object.rotation).to({z:2*Math.PI},(options.componentData.hasOwnProperty('enter') ) ? 3000 : -3000).repeat(Infinity).start();
    
  object.position.set( x, 0, z1 );
  composite.add(object);
};

module.exports = Conditional;