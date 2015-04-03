var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Selection = function (scene, position) {

  position = utils.checkDefaults(position);

  var curve = new THREE.EllipseCurve(
    position.x1,  0,   // ax, aY
    100, 100,         // xRadius, yRadius
    0,  2 * Math.PI,  // aStartAngle, aEndAngle
    false             // aClockwise
  );
  
  var path = new THREE.Path( curve.getPoints( 6 ) );
  var geometry = path.createPointsGeometry( 6 );
  var material = new THREE.LineBasicMaterial( { color : constants.color.selection , transparent: true, opacity: 0} );
  
  // Create the final Object3d to add to the scene
  var selection = new THREE.Line( geometry, material );

  selection.position.set(position.x1, 0, position.z1);
  selection.rotation.x = Math.PI/2;
  selection.rotate = new TWEEN.Tween(selection.rotation).to({z:2*Math.PI}, constants.time.selectionRotation ).repeat(Infinity).start();

  selection.name = 'selection';
  return selection;
};

module.exports = Selection;

