var displayScene=function(){	
	var composite,
	container, 
	containerWidth, 
	containerHeight,
	camera,
	scene,
	renderer,
	particle,
	particleLight,
	cubes,
	tween;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	/////////////////////////////////////////////////
	var timeline=utils.parseTimeline(dummyData.programSteps,dummyData.components);
	/////////////////////////////////////////////////
	
	init(timeline);
	animate();
	
	function init(data) {
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		
		containerWidth = container.clientWidth;
		containerHeight = container.clientHeight;

		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.z = 6000;
		camera.position.y = 0;
		camera.position.x = 0;
		
		controls = new THREE.OrbitControls( camera );
		controls.addEventListener( 'change', render );
		
		scene = new THREE.Scene();

		particleLight = TimeLight();
		particleLight.tween.start();
		scene.add( particleLight );
		
		composite = Composite(data);
		scene.add( composite );
		
		var dataLine=DataLine();
		scene.add( dataLine );
		
		var steps=30;
		var interval = 360/steps;
		var radianInterval = (2*Math.PI)/steps;
		for (var i=0;i<steps;i++){
			var geometry = new THREE.PlaneBufferGeometry( 300, 10 );
			var material = new THREE.MeshLambertMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
			var plane = new THREE.Mesh( geometry, material );
			plane.position.z+=5000;
			plane.rotation.z-=radianInterval*i;
			var coords = geo.getPoint(plane.position.x,plane.position.y,500,interval*i);
			plane.position.x=coords.x2;
			plane.position.y=coords.y2;
			scene.add( plane );
		}



		// User interaction
		window.addEventListener( 'mousemove', onMouseMove, false );
		renderer = new THREE.CanvasRenderer();
		renderer.setClearColor( 0x333333, 1);
		renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
		container.appendChild( renderer.domElement );
		window.addEventListener( 'resize', onWindowResize, false );
	}
	
	function DataLine() {
		
		var geometry = new THREE.CylinderGeometry( 5, 5, 10000, 3 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		var dataLine = new THREE.Mesh( geometry, material );
		dataLine.rotation.x+=Math.PI/2;
		dataLine.position.z+=5000;
		
		return dataLine;
	}
	
	function TimeLight() {
		var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 0, 0, 0 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
		var pointLight = new THREE.PointLight( 0xffffff, 2 );
		particleLight.add( pointLight );
		particleLight.tween=new TWEEN.Tween(particleLight.position).to({z:10000},5000).easing(TWEEN.Easing.Quadratic.InOut);
		return particleLight;
	}
	
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
	//this composite monstrosity should be a class
	function Composite(data) {
		var composite=new THREE.Object3D();
		composite.maxSize=10000;var interval=composite.maxSize/(data.length+1);
		var z=composite.maxSize/2;
		for (var i=0;i<data.length;i++){
			z+= 10;
			var shape;
			if (data[i].value==="cycle"){
				shape = subroutines.Loop( {z:z} );
			} else {
				shape = subroutines.Fun( {z:z} );
			}
			shape.componentData=data[i].component;
			shape.collapse=new TWEEN.Tween(shape.position).to({z:(composite.maxSize/2)+(10*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			shape.expand=new TWEEN.Tween(shape.position).to({z:((interval)+interval*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			composite.add( shape );
		}
		return composite;
	}

	function onMouseMove( e ) {
		var vector = new THREE.Vector3();
		var raycaster = new THREE.Raycaster();
		var dir = new THREE.Vector3();
		
		//check the type of camera
		if ( camera instanceof THREE.OrthographicCamera ) {
	    vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, - 1 ); // z = - 1 important!
	    vector.unproject( camera );
	    dir.set( 0, 0, - 1 ).transformDirection( camera.matrixWorld );
	    raycaster.set( vector, dir );
		} else if ( camera instanceof THREE.PerspectiveCamera ) {
	    vector.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1, 0.5 ); // z = 0.5 important!
	    vector.unproject( camera );
	    raycaster.set( camera.position, vector.sub( camera.position ).normalize() );
		}
		
		if (composite){
			var intersects = raycaster.intersectObjects( composite.children, true );	
			
			//cubes (change this later) is just the collection of shapes to check
			/*
			composite.children.forEach(function( shape ) {
				shape.material.color.setRGB( shape.grayness, shape.grayness, shape.grayness );
			});
			*/
			
			//here i'll manipulate the objects intersected by the ray
			for( var i = 0; i < intersects.length; i++ ) {
				var intersection = intersects[ i ];
				var obj = intersection.object;
				obj.material.color.setRGB( 1.0 - i / intersects.length, 0, 0 );
				console.log(obj.componentData);
			}
		}
		
	}

	
	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	
	window.pause=function(){
		if (window.scenePaused){
			particleLight.tween.start();
		} else {		
			particleLight.tween.stop();
		}
		window.scenePaused=!window.scenePaused;
	};
	
	window.expand=function(){
		if (window.expanded){
			for (var i=0;i<composite.children.length;i++){
				composite.children[i].collapse.start();
			}
		} else {
			for (var i=0;i<composite.children.length;i++){
				composite.children[i].expand.start();
			}
		}
		window.expanded=!window.expanded;
	};
	
	
	
	function render() {
		camera.lookAt(new THREE.Vector3(0,0,5000));

		TWEEN.update();

		//the animation loop
		if (particleLight.position.z===10000){
			particleLight.position.z=0;
			particleLight.tween.start();
		}
		
		renderer.render( scene, camera );
	}
	
};

displayScene.scenePaused=false;
displayScene.expanded=false;

window.onload=function(){
	displayScene();
	$("body").on("click","button#pause",function(){
		window.pause();
	});
	
	$("body").on("click","button#expand",function(){
		window.expand();
	});
	
};