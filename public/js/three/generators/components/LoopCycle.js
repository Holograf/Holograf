var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var LoopCycle = function (composite, options) {
console.log('LOOP CYCLE!!!');

  options = utils.checkDefaults(options);

  var steps = constants.loop.cycleSteps;
  var planeInterval = 360 / steps;
  var radianInterval = (2 * Math.PI) / steps;
  var group = new THREE.Object3D();

  for (var j = 0; j < steps; j++) {
    var ticGeometry = new THREE.PlaneBufferGeometry( constants.loop.ticWidth, constants.loop.ticHeight );
    var material = new THREE.MeshBasicMaterial( {color: constants.color.loopCycle, side: THREE.DoubleSide} );
    var plane = new THREE.Mesh( ticGeometry, material );
    plane.grayness = constants.color.loopCycleGrayness;


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

// subroutines.LoopCycle=function(composite,opts){

//   var steps=60;
//   var planeInterval = 360/steps;
//   var radianInterval = (2*Math.PI)/steps;
//   var group = new THREE.Object3D();
//   for (var j=0;j<steps;j++){
//     var ticGeometry = new THREE.PlaneBufferGeometry( 30, 10 );
//     var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
//     var plane = new THREE.Mesh( ticGeometry, material );
//     plane.grayness=1;
//     // plane.position.z=opts.z1;
//     plane.position.x=opts.x1;
//     plane.rotation.z-=radianInterval*j;
//     var coords = utils.getPoint(plane.position.x,plane.position.y,opts.radius,planeInterval*j);
//     plane.position.x=coords.x2;
//     plane.position.y=coords.y2;

    
//     plane.componentData=opts.componentData;
//     // plane=utils.tweenify(plane,{z1: opts.z1, z2:opts.z2, x1:plane.position.x, x2:plane.position.x+opts.x2} );
//     group.add( plane );
//   }
//   group.componentData=opts.componentData;
//   group.position.z = opts.z1;
//   group=utils.tweenify(group,{z1: opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
//   group.rotate=new TWEEN.Tween(group.rotation).to({z:2*Math.PI},(opts.componentData.hasOwnProperty('enter') ) ? 90000 : -90000).repeat(Infinity).start();
//   composite.add( group );
// };