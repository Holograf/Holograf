var displayScene=function(timeline){	
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
	modal,
	tween;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	/////////////////////////////////////////////////
	var timeline= timeline || utils.parseTimeline(dummyData.programSteps,dummyData.components);
	/////////////////////////////////////////////////
	
	init(timeline);
	animate();
	
	function init(data) {
		/*
		container = document.createElement( 'div' );
		document.body.appendChild( container );
		*/
		container = document.getElementById('three-scene');
		
		containerWidth = container.clientWidth;
		containerHeight = container.clientHeight;

		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 100000 );
		camera.position.z = 5000;
		camera.position.y = 0;
		camera.position.x = -4000;
		
		controls = new THREE.OrbitControls( camera, container );
		controls.addEventListener( 'change', render );
		
		scene = new THREE.Scene();

		particleLight = TimeLight();
		particleLight.tween.start();
		scene.add( particleLight );
		
		composite = Composite(data);
		scene.add( composite );
		
		var dataLine=DataLine();
		scene.add( dataLine );
		

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
			if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].component.value!=="cycle"){
				shape = subroutines.Loop( {z:z} );
			} else {
				shape = subroutines.Fun( {z:z} );
			}
			
			shape.componentData=data[i].component;
			shape.collapse=new TWEEN.Tween(shape.position).to({z:(composite.maxSize/2)+(10*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			shape.expand=new TWEEN.Tween(shape.position).to({z:((interval)+interval*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			composite.add( shape );
			
			
			if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].component.value==="cycle"){
				var steps=60;
				var planeInterval = 360/steps;
				var radianInterval = (2*Math.PI)/steps;
				for (var j=0;j<steps;j++){
					var ticGeometry = new THREE.PlaneBufferGeometry( 30, 10 );
					var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
					var plane = new THREE.Mesh( ticGeometry, material );
					plane.grayness=1;
					plane.position.z=z;
					plane.rotation.z-=radianInterval*j;
					var coords = geo.getPoint(plane.position.x,plane.position.y,500,planeInterval*j);
					plane.position.x=coords.x2;
					plane.position.y=coords.y2;
					
					
					plane.componentData=data[i].component;
					plane.rotate=new TWEEN.Tween(plane.position).to({})
					plane.collapse=new TWEEN.Tween(plane.position).to({z:(composite.maxSize/2)+(10*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
					plane.expand=new TWEEN.Tween(plane.position).to({z:((interval)+interval*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
					composite.add( plane );
							
				}
				
	
			}
			
			
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
			
			//if intersects.length===0 close the modal
			//and change all the composite shapes back to grey
			if (intersects.length<1){
				$("#three-modal").fadeOut();
				composite.children.forEach(function( shape ) {
					shape.material.color.setRGB( shape.grayness, shape.grayness, shape.grayness );
				});
			} else {
				//otherwise, open the modal and set the hovered-on object to yellow
				var d="";
				var selectedId=intersects[0].object.componentData.id;
				console.log(selectedId);
				for (var key in intersects[0].object.componentData){
					d+="<div>"+key+": "+intersects[0].object.componentData[key]+"</div>";
				}
				$("#three-modal").html(d);
				$("#three-modal").fadeIn();
				intersects[0].object.material.color.setRGB( 1, 1, 0 );
				
				//highlight different calls to the same variable
				composite.children.forEach(function( shape ) {
					//console.log(shape);
					if (shape.componentData.id===selectedId){
						shape.material.color.setRGB( 1, 1, 0 );
					}
				});
				
				
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
