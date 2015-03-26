var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Loop = function (composite, options) {
  options = utils.checkDefaults(options);

  var x=options.x1;
  var z1=options.z1;
  var z2=options.z2;

  var geometry = Object.create(geometries.loop);
  var grayness = constants.color.materialGrayness;
  var material = new THREE.MeshLambertMaterial({});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );

  object.grayness = grayness;
  object.componentData = options.componentData;
  object = utils.tweenify(object,{z1: z1, z2:z2, x1:options.x1, x2:options.x2} );
    
  object.position.set( x, 0, z1 );
  composite.add(object);
};

module.exports = Loop;