var utils = require('../utils');

var Listeners = {};
var theatre = {};

Listeners.initialize = function (input) {
  theatre = input;
}

Listeners.onWindowResize = function () {
  theatre.windowHalfX = window.innerWidth / 2;
  theatre.windowHalfY = window.innerHeight / 2;
  
  var camera = theatre.camera;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  var renderer = theatre.renderer;
  renderer.setSize( (window.innerWidth - 20), (window.innerHeight - 105) );
  theatre.render();
}

Listeners.onMouseMove = function ( e ) {
  if ( theatre.controlsEnabled === false ) return;

  var over = function (intersects) {
    if (!theatre.expanded) {return;}

    theatre.highlightNode = intersects[0].object;
    var selectedId = intersects[0].object.data.id;
    utils.shine(theatre.composite, selectedId);
  }

  checkMouseOver(e, over);
}


Listeners.onMouseDown = function ( e ) {
  e.preventDefault();

  if (!theatre.controlsEnabled) return;
  if (!theatre.expanded) { 
    theatre.expand();
    return;
  }

  // remove prior component highlighting
  utils.dull(theatre.composite);


  var over = function (intersects) {
    var selectedId = intersects[0].object.data.id || -1;

    var node = intersects[0].object;

    if (node.data && node.data.primary) {
      theatre.currentNode = intersects[0].object;
      theatre.view(theatre.currentNode.position);

      theatre.nodeView = true;
    }

    theatre.controls.update();
  }

  checkMouseOver(e, over);

}

function checkMouseOver (e, over, notOver) {

  e.preventDefault();
  var camera = theatre.camera;
  var composite = theatre.composite;

  var vector = new THREE.Vector3();
  var raycaster = new THREE.Raycaster();
  var dir = new THREE.Vector3();

  //extract that offset into external variable that doesn't have to be recalculated every time... later
  var x =  ( e.clientX / window.innerWidth ) * 2 - 1;
  var y = - ( (e.clientY - $(theatre.container).offset().top ) / (window.innerHeight-105) ) * 2 + 1;

  //check the type of camera
  vector.set( x, y, 0.5 ); // z = 0.5 important!
  vector.unproject( camera );
  raycaster.set( camera.position, vector.sub( camera.position ).normalize() );


  if (composite){
    var intersects = raycaster.intersectObjects( composite.children, true );  

    if (intersects.length < 1){
      utils.dull(theatre.composite);
      if (notOver) { 
        notOver(); 
      }
    } else {
      over(intersects);
    }
  }
}

module.exports = Listeners;

