var constants = require('../Constants');

var View = function(nodePosition) {
  var theatre = this;
  if (!theatre.expanded) return;
  var camera = theatre.camera;

  // final camera position
  var newX = nodePosition.x - constants.camera.offsetX;
  var newY = nodePosition.y + constants.camera.offsetY;
  var newZ = nodePosition.z + constants.camera.offsetZ;
  theatre.target = new THREE.Vector3(nodePosition.x, nodePosition.y, nodePosition.z);
  var targetPosition = new THREE.Vector3(newX, newY, newZ);

  // camera rotation
    // use extra camera to find rotation at target location
  var nextCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 5000);
  nextCamera.position.x = targetPosition.x;
  nextCamera.position.y = targetPosition.y;
  nextCamera.position.z = targetPosition.z;
  nextCamera.lookAt(nodePosition);
  var endRotation = new THREE.Quaternion().copy( nextCamera.rotation );

  // camera motion on click - position & rotation
  new TWEEN.Tween(camera.position).to(targetPosition, theatre.cameraSpeed).easing(TWEEN.Easing.Quadratic.InOut).start();
  new TWEEN.Tween( camera.rotation ).to(endRotation, theatre.cameraSpeed).easing(TWEEN.Easing.Quadratic.InOut).start();

  // set new camera position & rotation to avoid change after tweening to viewNode  --  this isn't working yet
  // camera.position = targetPosition; // new THREE.Vector3(newX, newY, newZ);
  // camera.rotation = nextCamera.rotation; // new THREE.Quaternion().copy( nextCamera.rotation );

  nextCamera = null;

  theatre.actions.updateHighlight(theatre.currentNode.data);

  placeSelection(theatre);
  theatre.nodeView = true;
};

var placeSelection = function (theatre) {
  var nodePosition = theatre.currentNode.position;
  var selection = theatre.selection;

  selection.material.opacity = 0;
  selection.position.x = nodePosition.x;
  selection.position.y = nodePosition.y - 250;
  selection.position.z = nodePosition.z;
  new TWEEN.Tween(selection.position).to( {y: nodePosition.y - 100}, 300 ).start();
  new TWEEN.Tween(selection.material).to( {opacity:1}, 300 ).start();
}


module.exports = View;


