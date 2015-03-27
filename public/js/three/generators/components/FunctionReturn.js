var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var FunctionReturn = function (composite, options) {
  options = utils.checkDefaults(options);

  var x = options.x;
  var z1 = options.z1;
  var z2 = options.z2;

  var geometry = Object.create(geometries.functionInvocation);
  var grayness = constants.color.grayness;
  var material = new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
  material.color.setRGB( grayness, grayness, grayness );
  var object = new THREE.Mesh(geometry, material );

  object.grayness = grayness;
  object.componentData = options.componentData;
  object.componentData.primary = true;
  object = utils.tweenify(object, {z1:z1, z2:z2, x1:options.x1, x2:options.x2} );
    
  object.position.set(x, 0, z1 );
  object.rotation.x = -1 * (Math.PI / 2);
  composite.add(object);
};

module.exports = FunctionReturn;