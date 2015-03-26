var utils = require('./utils');
var subroutines = require('./subroutines');
var Actions = require('../actions/ThreeActions');


var theatre = {
	scenePaused: true, 
	expanded: false, 
	controlsEnabled: true, 	//toggle based on tab, link controls to
	nodeView: false,
	cameraSpeed: 1500,
	firstRender: true,
	modal: null,
	headline: null,
	rippleList: null
};


theatre.display = function(allData, renderEnd) {	
	var camera, composite, container, controls, modal, particleLight, renderer, scene, selectHalo, tween, visualTimeline;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;

	var scopes = allData.scopes;
	var timeline = allData.timeline;

	theatre.timeline = timeline;
	
	init(timeline);

	renderEnd();

	animate();
	
	function init(data) {

		scene = new THREE.Scene();
		theatre.scene = scene;

		// timeline elements
		particleLight = subroutines.TimeLight();
		scene.add( particleLight );
		composite = subroutines.Composite(data, scopes, particleLight);
		theatre.maxSize = composite.maxSize;
		scene.add( composite );

		visualTimeline = subroutines.VisualTimeline(data, scopes);
		scene.add(visualTimeline);

		subroutines.dotGrid(scene,data, scopes, composite.maxSize);
		subroutines.skybox(scene, composite.maxSize);

		camera = new THREE.PerspectiveCamera( 60, (window.innerWidth-20) / window.innerHeight, 1, 100000 );
		theatre.camera = camera;
		var camDistPartial = composite.maxSize >= 1000 ? composite.maxSize / 2 : 1000;
		camera.position.x = -camDistPartial;
		camera.position.y = camDistPartial * 1.5;
		camera.position.z = camDistPartial;
		theatre.target = new THREE.Vector3(0, 0, composite.maxSize/2);
		theatre.initTarget = new THREE.Vector3().copy(theatre.target);
		// theatre.initTarget.copy( position ).sub( theatre.target );

		// Fourth argument is just for anything that is defined AFTER the controls.
		theatre.controls = new THREE.OrbitControls(camera, container, theatre.target, theatre.initCamera, theatre);

		// controls.addEventListener( 'change', render );

		theatre.initCamera = {
			'position': new THREE.Vector3().copy( camera.position ), 
			'rotation': new THREE.Quaternion().copy( camera.rotation )};

		selectHalo = subroutines.SelectHalo(scene);
		scene.add(selectHalo);
		selectHalo.material.opacity = 0;
		theatre.selectHalo = selectHalo;


		// renderer
		renderer = new THREE.WebGLRenderer({antialias:true});
		theatre.renderer = renderer;
		renderer.setClearColor( 0x333333, 1);
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight - 105);  // hard-coded top offset

	
		container = document.getElementById('three-scene');
		theatre.container = container;
		container.appendChild(renderer.domElement);

		// User interaction
		theatre.container.addEventListener( 'mousemove', onMouseMove, false );
		window.addEventListener( 'mousedown', onMouseDown, false);
		// theatre.container.addEventListener( 'mousedown', onMouseDown, false);
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( (window.innerWidth - 20), (window.innerHeight - 105) );
		render();
	}

	function checkMouseOver (e, over, notOver) {
		e.preventDefault();

		var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();

		//extract that offset into external variable that doesn't have to be recalculated every time... later
		var x =  ( e.clientX / window.innerWidth ) * 2 - 1;
		var y = - ( (e.clientY-$(container).offset().top ) / (window.innerHeight-105) ) * 2 + 1;

		//check the type of camera
		if ( camera instanceof THREE.OrthographicCamera ) {
	    vector.set( x, y, - 1 ); // z = - 1 important!
	    vector.unproject( camera );
	    dir.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
	    raycaster.set( vector, dir );
		} else if ( camera instanceof THREE.PerspectiveCamera ) {
	    vector.set( x, y, 0.5 ); // z = 0.5 important!
	    vector.unproject( camera );
	    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
		}

		if (composite){
			var intersects = raycaster.intersectObjects( composite.children, true );	

			if (intersects.length<1){
				utils.dull(composite);
				if (notOver) { 
					notOver(); 
				}
			} else {
				over(intersects);
			}
		}

	}

	function onMouseMove( e ) {
		if ( theatre.controlsEnabled === false ) return;

		var over = function (intersects) {
			if (!theatre.expanded) {return;}

			theatre.highlightNode = intersects[0].object;
			var selectedId = intersects[0].object.componentData.id;
			utils.shine(composite, selectedId);
		}

		checkMouseOver(e, over);
		
	}


	function onMouseDown ( e ) {
		e.preventDefault();
		if (!theatre.controlsEnabled) return;
		if (!theatre.expanded) { 
			theatre.expand();
			return;
		}

		// Remove modal overlays
		if (document.getElementById("modal-canvas")){
			document.body.removeChild(document.getElementById("modal-canvas"));
			theatre.modal = null;
			theatre.rippleList = null;
			theatre.headline = null;
		}
		// remove prior component highlighting
		utils.dull(composite);


		var over = function (intersects) {
			var selectedId = intersects[0].object.componentData.id || -1;

			theatre.currentNode = intersects[0].object;
			theatre.viewNode(theatre.currentNode.position);

			theatre.nodeView = true;
			theatre.controls.update();
		}


		checkMouseOver(e, over);

  }


	function placeHalo(nodePosition) {
		selectHalo.material.opacity = 0;
		selectHalo.position.x = nodePosition.x;
		selectHalo.position.y = nodePosition.y - 250;
		selectHalo.position.z = nodePosition.z;
		new TWEEN.Tween(selectHalo.position).to( {y: nodePosition.y - 100}, 300 ).start();
		new TWEEN.Tween(selectHalo.material).to( {opacity:1}, 300 ).start();
	}
	
	function animate() {
		theatre.reqId = requestAnimationFrame( animate );
		render();
	}

	theatre.nextNode = function() {
		if (!theatre.expanded) theatre.expand();
		var foundNext = false;
		var i = 0;
		utils.dull(composite);

		if (!theatre.nodeView) {
			while (!foundNext && i < composite.children.length) {
				// Get this to move on to the next one that's primary, even if it's not the NEXT index
				if (composite.children[i].componentData.primary ) {				
					theatre.currentNode = composite.children[i];
					theatre.viewIndex = i;
					foundNext = true;
				}
				i++;
			}
		}

		i = 0;
		while (!foundNext && i < composite.children.length) {
			// Get this to move on to the next one that's primary, even if it's not the NEXT index
			if ( theatre.viewIndex < composite.children[i].componentData.timelineIndex && composite.children[i].componentData.primary ) {				
				theatre.currentNode = composite.children[i];
				theatre.viewIndex = i;
				foundNext = true;
			}
			i++;
		}
		// loop back beginning if none found after
		if (!foundNext) {
			i = 0;
			while (!foundNext && i < composite.children.length) {
				// Get this to move on to the next one that's primary, even if it's not the NEXT index
				if (composite.children[i].componentData.primary ) {				
					theatre.currentNode = composite.children[i];
					theatre.viewIndex = i;
					foundNext = true;
				}
				i++;
			}
		}
		utils.shine(composite,theatre.currentNode.componentData.id);
		theatre.viewNode(theatre.currentNode.position);
	};

	theatre.prevNode = function() {
		if (!theatre.expanded) theatre.expand();
		var foundPrev = false;
		var i = composite.children.length - 1; 
		utils.dull(composite);
		
		if (!theatre.nodeView) {
			while (!foundPrev && i >= 0) {
				if (composite.children[i].componentData.primary ) {				
					theatre.currentNode = composite.children[i];
					theatre.viewIndex = i;
					foundPrev = true;
				}
				i--;
			}
		} 

		i = composite.children.length - 1;
		while (!foundPrev && i >= 0) {
			if ( theatre.viewIndex > composite.children[i].componentData.timelineIndex && composite.children[i].componentData.primary ) {
				theatre.currentNode = composite.children[i];
				theatre.viewIndex = i;
				foundPrev = true;
			}
			i--;
		}
		// loop back beginning if none found after
		if (!foundPrev) {
			i = composite.children.length - 1;
			while (!foundPrev && i >= 0) {
				if (composite.children[i].componentData.primary ) {				
					theatre.currentNode = composite.children[i];
					theatre.viewIndex = i;
					foundPrev = true;
				}
				i--;
			}
		}

		theatre.viewNode(theatre.currentNode.position);
		if (theatre.currentNode && theatre.currentNode.componentData.id){
			utils.shine(composite,theatre.currentNode.componentData.id);
		}

	};

	theatre.viewNode = function(nodePosition) {
		if (!theatre.expanded) return;

		// final camera position
		var newX = nodePosition.x - 800;
		var newY = nodePosition.y + 800;
		var newZ = nodePosition.z - 300;
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

		theatre.viewIndex = theatre.currentNode.componentData.timelineIndex;

		Actions.updateHighlight(theatre.currentNode.componentData);

		placeHalo(theatre.currentNode.position);
		theatre.nodeView = true;
	};

	theatre.pause = function(){
		theatre.scenePaused ? particleLight.tween.start() : particleLight.tween.stop();
		theatre.scenePaused = !theatre.scenePaused;
	};

	theatre.expand = function() {
		var action = theatre.expanded ? "collapse" : "expand";
		for (var i = 0; i < composite.children.length; i++){
			composite.children[i][action].start();
		}
		if (action === 'collapse'){
			visualTimeline.hide.start();
			particleLight.material.opacity = 0;
			// gray out all shapes
			$("#three-modal").hide();
			utils.dull(composite);
			
		} else {
			visualTimeline.show.start();
			particleLight.material.opacity = 1;
		}
		theatre.pause();
		selectHalo.material.opacity = 0;
		theatre.expanded = !theatre.expanded;
	};

	theatre.clearScene = function() {

		cancelAnimationFrame(theatre.reqId);  // Stop the animation
		// document.removeEventListener( 'keydown', controls.onKeyDown, false );
		theatre.container.removeEventListener( 'mousemove', onMouseMove, false );
		theatre.container.removeEventListener( 'mousedown', onMouseDown, false);
		window.removeEventListener( 'resize', onWindowResize, false );

		theatre.scene = null;
		theatre.camera = null;
		theatre.controls = null;
		theatre.nodeView = false;
		theatre.expanded = false;
		theatre.scenePaused = true;

		empty(theatre.container);

		function empty(elem) {
	    while (elem.lastChild) { 
	    	elem.removeChild(elem.lastChild);
	    }
		}

	};


	function render() {
		TWEEN.update();
		renderer.render( scene, camera );
		// effect.render( scene, camera );			// This is used for stereoEffect
	}
};

module.exports = theatre;
