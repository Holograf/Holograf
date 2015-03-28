var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');
var addToComposite = require('./AddToComposite');

var LoopCycle = function (composite, timelineElement) {

  var steps = constants.loop.cycleSteps;
  var planeInterval = 360 / steps;
  var radianInterval = (2 * Math.PI) / steps;
  var group = new THREE.Object3D();

  for (var j = 0; j < steps; j++) {
    var ticGeometry = new THREE.PlaneBufferGeometry( constants.loop.ticWidth, constants.loop.ticHeight );
    var material = new THREE.MeshBasicMaterial( {color: constants.color.loopCycle, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( ticGeometry, material );
    plane.grayness = constants.color.loopCycleGrayness;


    plane.position.x = timelineElement.position.x;
    plane.position.z = timelineElement.position.z2;
    plane.rotation.z -= radianInterval * j;

    var coords = utils.getPoint(plane.position.x, plane.position.y, constants.size.radius, planeInterval * j);
    plane.position.x = coords.x2;
    plane.position.y = coords.y2;
    
    group.add( plane );
  }

  group.rotate = new TWEEN.Tween(group.rotation).to({x:2*Math.PI}, constants.time.loopCycle).repeat(Infinity).start();
  group.rotation.y = (Math.PI / 2);

  addToComposite(composite, group, timelineElement);
};

module.exports = LoopCycle;
