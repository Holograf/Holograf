var THREE = require('three');
var TWEEN = require('tween.js');

var generate = require('../generators/Generators');
var constants = require('../Constants');
var utils = require('../utils');
var listeners = require('./Listeners');
var generate = require('../generators/Generators');
generate.composite = require('../generators/Composite');

var initialize = {};
initialize.controls = require('./Controls');

function Init () {

  var theatre = this;
  theatre.container = document.getElementById('three-scene');
  
  var scopes = theatre.data.scopes;
  var composite = theatre.composite;
  var timeline = theatre.timeline;
  var container = theatre.container;

  theatre.scenePaused = true; 
  theatre.expanded = false;
  theatre.controlsEnabled = true;  //toggle based on tab, link controls to
  theatre.nodeView = false;
  theatre.cameraSpeed = 1500;
  theatre.firstRender = true;


  theatre.scene = new THREE.Scene();

  theatre.windowHalfX = window.innerWidth / 2;
  theatre.windowHalfY = window.innerHeight / 2;

  // timeline elements
  timelight = generate.timelight();
  theatre.add( timelight );

  composite = generate.composite(theatre);
  theatre.maxSize = composite.maxSize;
  theatre.add( composite );

  visualTimeline = generate.visualTimeline(theatre);
  theatre.add( visualTimeline );

  generate.dotGrid(theatre);
  generate.skybox(theatre);

  camera = new THREE.PerspectiveCamera( 60, (window.innerWidth-20) / window.innerHeight, 1, 100000 );
  theatre.camera = camera;

  var camDistPartial = composite.maxSize >= 1000 ? composite.maxSize / 2 : 1000;
  camera.position.x = camDistPartial;
  camera.position.y = camDistPartial * 1.5;
  camera.position.z = camDistPartial;
  theatre.target = new THREE.Vector3(composite.maxSize / 2, 0, 0);
  theatre.initTarget = new THREE.Vector3().copy(theatre.target);


  initialize.controls(theatre);

  theatre.initCamera = {
    'position': new THREE.Vector3().copy( camera.position ), 
    'rotation': new THREE.Quaternion().copy( camera.rotation )
  };


  selection = generate.selection(theatre.scene);
  selection.material.opacity = 0;
  theatre.add( selection );


  // renderer
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColor( constants.color.clearColor, 1);
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight - constants.size.topOffset);  // hard-coded top offset
  theatre.renderer = renderer;

  container.appendChild(renderer.domElement);

  // User interaction
  listeners.initialize(theatre);
  theatre.container.addEventListener( 'mousemove', listeners.onMouseMove, false );
  window.addEventListener( 'mousedown', listeners.onMouseDown, false);
  window.addEventListener( 'resize', listeners.onWindowResize, false );

}

module.exports = Init;