var theatre={scenePaused:false,expanded:false};

theatre.display=function(allData){	
	var composite, container, controls, camera, scene, renderer, particleLight, tween, visualTimeline;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var centerPoint;
	var scopes=utils.extractScopes(allData);
	var timeline=utils.parseTimeline(allData.programSteps,allData.components);
	
	init(timeline);
	animate();
	
	function init(data) {
		container = document.getElementById('three-scene');

		scene = new THREE.Scene();
		
		composite = subroutines.Composite(data,scopes);
		centerPoint = new THREE.Vector3(0,0,composite.maxSize/2);
		scene.add( composite );
		
		particleLight = subroutines.TimeLight(0,composite.maxSize);
		particleLight.tween.start();
		particleLight.tween.onComplete(function(){
			particleLight.position.z=0;
			particleLight.tween.start();
		});
		scene.add( particleLight );
		
		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, Math.max(100000,composite.maxSize) );
		camera.position.z = composite.maxSize/2;
		camera.position.y = 0;
		camera.position.x = Math.min(-2000,-1*(composite.maxSize/3) );
		
		
		controls = new THREE.OrbitControls(camera, container);
		controls.addEventListener( 'change', render );
		
		visualTimeline = subroutines.VisualTimeline(data,scopes);
		scene.add(visualTimeline);
		//will add the dotgrid to the scene;
		subroutines.dotGrid(scene,data,scopes,composite.maxSize);
		
		renderer = new THREE.WebGLRenderer();
			renderer.setPixelRatio( window.devicePixelRatio );
			renderer.setSize( window.innerWidth, window.innerHeight-$(container).offset().top );
			renderer.setClearColor( 0x333333, 1);
			container.appendChild( renderer.domElement );
		// User interaction
		window.addEventListener( 'mousemove', onMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
	}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
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
				$("#three-modal").fadeOut();
				composite.children.forEach(function( shape ) {
					shape.material.color.setRGB( shape.grayness, shape.grayness, shape.grayness );
				});
			} else {
				var selectedId=intersects[0].object.componentData.id;
				$("#three-modal").html( utils.displayText(intersects[0].object) );
				if (!$("#three-modal").is(":visible") ){
					$("#three-modal").fadeIn();
				}
				intersects[0].object.material.color.setRGB( 1, 1, 0 );
				composite.children.forEach(function( shape ) {
					if (shape.componentData.id===selectedId){
						shape.material.color.setRGB( 1, 1, 0 );
					}
				});
			}
		}
		
		
	}

	
	function animate() {
		requestAnimationFrame( animate );
		controls.update();
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
		camera.lookAt(centerPoint);
		TWEEN.update();
		renderer.render( scene, camera );
		sceneRendered = true;
	}
	
};