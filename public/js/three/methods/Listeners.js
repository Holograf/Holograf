var THREE = require('three');
var TWEEN = require('tween.js');

var highlight = require('../methods/Highlight');

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

    theatre.hoveredNode = intersects[0].object;
    // console.log(theatre.hoveredNode);

    highlight.shine(theatre.composite, theatre.hoveredNode);

    theatre.actions.updateHover( theatre.hoveredNode.data );
  }


  var notOver = function () {
    theatre.hoveredNode = null;
    theatre.actions.updateHover ( null );
  }

  checkMouseOver(e, over, notOver);
}


Listeners.onMouseDown = function ( e ) {
  e.preventDefault();

  if (!theatre.controlsEnabled) return;
  if (!theatre.expanded) { 
    theatre.expand();
    return;
  }

  // remove prior component highlighting
  highlight.dull(theatre.composite);


  var over = function (intersects) {
    var selectedId = intersects[0].object.data.id || -1;

    var component = intersects[0].object;

    if (component.data && component.data.primary) {
      theatre.select.node(intersects[0].object);
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
      highlight.dull(theatre.composite);
      if (notOver) { 
        notOver(); 
      }
    } else {
      over(intersects);
    }
  }
}

module.exports = Listeners;

