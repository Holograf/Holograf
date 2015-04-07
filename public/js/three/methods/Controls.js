var THREE = require('three');
var TWEEN = require('tween.js');
var OrbitControls = require('./OrbitControls')(THREE);

var Controls = function (theatre) {
  var container = theatre.container;
  var camera = theatre.camera;
  
  theatre.controls = new OrbitControls(camera, container);

  var controls = theatre.controls;

  // Reset event listeners upon recompile
  if (theatre.compiledStatus) {
    container.removeEventListener( 'contextmenu', function ( event ) { event.preventDefault(); }, false );
    container.removeEventListener( 'mousedown', controls.onMouseDown, false );
    container.removeEventListener( 'mousewheel', controls.onMouseWheel, false );
    container.removeEventListener( 'DOMMouseScroll', controls.onMouseWheel, false ); // firefox
    container.removeEventListener( 'touchstart', controls.touchstart, false );
    container.removeEventListener( 'touchend', controls.touchend, false );
    container.removeEventListener( 'touchmove', controls.touchmove, false );
    document.body.removeEventListener( 'keydown', onKeyDown, false );
  }

  controls.target = theatre.target || new THREE.Vector3(0, 0, 2500);
  controls.target0 = theatre.target.clone();
  controls.update();

  controls.maxDistance = theatre.maxSize > 1000 ? theatre.maxSize : 1000;
  controls.keyPanSpeed = 20.0;

  controls.keys = { LEFT: 37, UP: 38, RIGHT: 39, DOWN: 40, EXPAND: 32, PAUSE: 13 };

  theatre.resetControls = function () {
    if (theatre.initCamera) {
      new TWEEN.Tween(theatre.camera.position)
        .to(theatre.initCamera.position, theatre.cameraSpeed)
        .easing(TWEEN.Easing.Quadratic.InOut).start();
      new TWEEN.Tween( theatre.camera.rotation )
        .to(theatre.initCamera.rotation, theatre.cameraSpeed)
        .easing(TWEEN.Easing.Quadratic.InOut).start();
    }

    theatre.selectHalo.material.opacity = 0;
    theatre.nodeView = false;

    controls.reset();
  }
  
  function onKeyDown ( event ) {

    if (!theatre.expanded) {
      theatre.expand();
      return;
    }

    switch ( event.keyCode ) {
      case controls.keys.LEFT:
        theatre.select.previous();
        controls.update();
        break;

      case controls.keys.RIGHT:
        theatre.select.next();
        controls.update();
        break;

      case controls.keys.DOWN:
        controls.reset();
        break;

      case controls.keys.EXPAND:
        theatre.expand();
        break;

      case controls.keys.PAUSE:
        theatre.pause();
        break;
    }
  }

  document.body.addEventListener('keydown', onKeyDown, false);

}

module.exports = Controls;