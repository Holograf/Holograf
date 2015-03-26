var utils = require('../utils');
var geometries = require('../Geometries');
var constants = require('../Constants');

var LoopCycle = function (composite, options) {
  options = utils.checkDefaults(options);

  var steps = constants.loopCycleSteps;
  var planeInterval = 360 / steps;
  var radianInterval = (2 * Math.PI) / steps;
  var group = new THREE.Object3D();

  for (var j = 0; j < steps; j++) {
    var ticGeometry = new THREE.PlaneBufferGeometry( Constants.loop.ticWidth, Constants.loop.ticHeight );
    var material = new THREE.MeshBasicMaterial( {color: Constants.color.loopCycle, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( ticGeometry, material );
    plane.grayness = Constants.color.loopCycleGrayness;


    plane.position.x = options.x1;
    plane.rotation.z -= radianInterval * j;

    var coords = utils.getPoint(plane.position.x, plane.position.y, options.radius, planeInterval * j);
    plane.position.x = coords.x2;
    plane.position.y = coords.y2;

    
    plane.componentData = options.componentData;
    group.add( plane );
  }

  group.componentData = options.componentData;
  group.position.z = options.z1;
  group = utils.tweenify(group, {z1: options.z1, z2:options.z2, x1:options.x1, x2:options.x2} );

  group.rotate = new TWEEN.Tween(group.rotation).to({z:2*Math.PI}, constants.time.loopCycle).repeat(Infinity).start();
  composite.add( group );
};

module.exports = LoopCycle;