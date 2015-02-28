var theatre = {
	scenePaused: false, 
	expanded: false, 
	controlsEnabled: true, 
	nodeView: false
};

theatre.display=function(allData){	
	var camera, composite, container, controls, modalCanvas, particleLight, renderer, scene, tween, visualTimeline;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var scopes = utils.extractScopes(allData);
	var timeline = utils.parseTimeline(allData.programSteps, allData.components);
	
	
	init(timeline);
	animate();
	
	function init(data) {

		// PerspectiveCamera method args: (field of view angle, aspectRatio, near, far)
		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.x = -3000;
		camera.position.y = 3000;
		camera.position.z = 5000;

		controls = new THREE.OrbitControls(camera, container);
		// controls.addEventListener( 'change', render );
		
		scene = new THREE.Scene();
		
		// theatre.camera = camera;
		// theatre.target = target;


		// timeline elements

		particleLight = subroutines.TimeLight();
		particleLight.tween.start();
		particleLight.tween.onComplete(function(){
			particleLight.position.z=0;
			particleLight.tween.start();
		});
		scene.add( particleLight );

		composite = subroutines.Composite(data,scopes);
		scene.add( composite );

		visualTimeline = subroutines.VisualTimeline(data,scopes);
		scene.add(visualTimeline);

		//will add the dotgrid to the scene;
		subroutines.dotGrid(scene,data,scopes,composite.maxSize);
		subroutines.skybox(scene, composite.maxSize);

		// scene.add(subroutines.Axes()[0]);
		// scene.add(subroutines.Axes()[1]);
		// scene.add(subroutines.Axes()[2]);


		// renderer
		renderer = new THREE.WebGLRenderer({antialias:true});
		renderer.setClearColor( 0x333333, 1);
		renderer.setPixelRatio( window.devicePixelRatio );
		renderer.setSize( window.innerWidth, window.innerHeight - 86);  // hard-coded top offset
		// renderer.setSize( window.innerWidth, window.innerHeight-$(container).offset().top );
	
		container = document.getElementById('three-scene');
		container.appendChild(renderer.domElement);

		//modal
		modal=createModal();
		// User interaction
		window.addEventListener( 'mousemove', onMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'mousedown', onMouseDown, false);
	}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
		// render();
	}

	function onMouseMove( e ) {
		var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();

		//check the type of camera
		//extract that offset into an external variable that doesn't have to be recalculated every time... later
		var x =  ( event.clientX / window.innerWidth ) * 2 - 1;
		var y = - ( (event.clientY-$(container).offset().top ) / window.innerHeight ) * 2 + 1;
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
				if (document.getElementById("modal-canvas")){
					document.body.removeChild(document.getElementById("modal-canvas"));
				}
				$("#three-modal").hide();
				composite.children.forEach(function( shape ) {
					shape.material.color.setRGB( shape.grayness, shape.grayness, shape.grayness );
					shape.material.opacity = 0;
				});
			} else {
				var selectedId=intersects[0].object.componentData.id;
				$("#three-modal").html( utils.displayText(intersects[0].object) );
				if (!$("#three-modal").is(":visible") ){
					$("#three-modal").fadeIn();
				}
				intersects[0].object.material.color.setRGB( 1, 1, 0 );
				composite.children.forEach(function( shape ) {
					if (shape.material.hasOwnProperty('opacity') ){
						shape.material.opacity = 1;
					}
					if (shape.componentData.id===selectedId){
						shape.material.color.setRGB( 1, 1, 0 );
					}
				});
				
				//raphael code here?
				if ($("#modal-canvas").length===0){
					modal = createModal();
					utils.modal.donut(modal,event.clientX,event.clientY,intersects[0]);
					utils.modal.headline(modal,intersects[0]);
				} 
				///
				
			}
		}
		
		
	}

	function onMouseDown () {
		var cameraSpeed = 1500;

		if (theatre.nodeView) {

			new TWEEN.Tween(camera.position).to(theatre.lastPosition, cameraSpeed).start();
			new TWEEN.Tween( camera.rotation ).to(theatre.lastRotation, cameraSpeed).start();
			theatre.nodeView = false;
		}

		var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();

		//check the type of camera
		//extract that offset into an external variable that doesn't have to be recalculated every time... later
		var x =  ( event.clientX / window.innerWidth ) * 2 - 1;
		var y = - ( (event.clientY-$(container).offset().top ) / window.innerHeight ) * 2 + 1;
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
		
		if (composite && !theatre.nodeView){
			var intersects = raycaster.intersectObjects( composite.children, true );	
			if (intersects.length > 0) { 

				// save initial camera position for return
				theatre.lastPosition = new THREE.Vector3().copy( camera.position );
				theatre.lastRotation = new THREE.Quaternion().copy( camera.rotation );
				// final camera position
				var newX = intersects[0].point.x - 600;
				var newY = intersects[0].point.y + 600;
				var newZ = intersects[0].point.z - 300;
				var targetPosition = new THREE.Vector3(newX, newY, newZ);


				// camera rotation
					// use extra camera to find rotation at target location
				var nextCamera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
				nextCamera.position.x = targetPosition.x;
				nextCamera.position.y = targetPosition.y;
				nextCamera.position.z = targetPosition.z;
				nextCamera.lookAt(intersects[0].point);
				var endRotation = new THREE.Quaternion().copy( nextCamera.rotation );

				// camera motion on click - position & rotation
				new TWEEN.Tween(camera.position).to(targetPosition, cameraSpeed).start();
				new TWEEN.Tween( camera.rotation ).to(endRotation, cameraSpeed).start();
				nextCamera = null;
				theatre.nodeView = true;
			}
		}
	}


	function createModal(){
		
	  var canvas=document.createElement("DIV");
	  canvas.id="modal-canvas";
	  canvas.style.position="fixed";
	  canvas.style.top="0px";
	  canvas.style.left="0px";
	  canvas.style.width=$(window).innerWidth()+"px";
	  canvas.style.height=$(window).innerHeight()+"px";
	
	  document.body.appendChild(canvas);
	  
	  var c = new Raphael('modal-canvas');
	  return c;
	}
	
	function animate() {
		requestAnimationFrame( animate );
		// controls.update();
		render();
	}

	theatre.pause=function(){
		theatre.scenePaused ? particleLight.tween.start() : particleLight.tween.stop();
		theatre.scenePaused=!theatre.scenePaused;
	};

	theatre.expand=function(){
		var action = theatre.expanded ? "collapse" : "expand";
		for (var i=0;i<composite.children.length;i++){
			composite.children[i][action].start();
			if (action==='collapse'){
				visualTimeline.hide.start();
			} else {
				visualTimeline.show.start();
			}
		}
		theatre.expanded=!theatre.expanded;
	};


	function render() {
		TWEEN.update();
		renderer.render( scene, camera );
		// effect.render( scene, camera );			// This is used for stereoEffect
	}
};
