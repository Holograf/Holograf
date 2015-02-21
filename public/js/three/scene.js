
/*
// var renderer, scene, camera, controls;
// var sceneRendered = false;

var deleteScene=function() {	
	cancelAnimationFrame('three-scene');// Stop the animation
	scene = null;
	camera = null;
	controls = null;
	// renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
	// projector = null;
	// empty(this.modelContainer);
};
// var empty=function(elem){
//   while (elem.lastChild) elem.removeChild(elem.lastChild);
// }
*/

var displayScene=function(allData){	
	console.log('scene displayed');

	var composite,
	container, 
	containerWidth, 
	containerHeight,
	scopes,
	controls,
	camera,
	scene,
	renderer,
	particle,
	particleLight,
	cubes,
	modal,
	scenePaused=false,
	expanded=false,
	tween;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	
	//extract this later
	
	scopes={};
	console.log("---scopes---");
	console.log(allData);
	var scopeX=0;
	for (var key in allData.scopes){
		scopes[key]=scopeX+500;
		scopeX+=500;
	}
	console.log(scopes);
	console.log("---end scopes---");
	//end extraction
	
	/////////////////////////////////////////////////
	var timeline=utils.parseTimeline(allData.programSteps,allData.components);
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
		
		controls = new THREE.OrbitControls(camera, container);
		controls.addEventListener( 'change', render );
		


		scene = new THREE.Scene();

		particleLight = TimeLight();
		particleLight.tween.start();
		scene.add( particleLight );
	
		composite = Composite(data);
		scene.add( composite );
	
		var visualTimeline = VisualTimeline(data);
		scene.add(visualTimeline);
		
		dotGrid(data,scopes,composite.maxSize);


		// User interaction
		window.addEventListener( 'mousemove', onMouseMove, false );
		renderer = new THREE.CanvasRenderer();
		renderer.setClearColor( 0x333333, 1);
		renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
		container.appendChild( renderer.domElement );
		window.addEventListener( 'resize', onWindowResize, false );


		// Stereoscopic effect
		// effect = new THREE.StereoEffect( renderer );
		// effect.eyeSeparation = 10;
		// effect.setSize( window.innerWidth, window.innerHeight );


	}
	
	function DataLine(x) {
		var geometry = new THREE.CylinderGeometry( 5, 5, 10000, 3 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		var dataLine = new THREE.Mesh( geometry, material );
		dataLine.rotation.x+=Math.PI/2;
		dataLine.position.z+=5000;
		dataLine.position.x+=x;
		
		
		
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
	
	
	function VisualTimeline(data){
		var maxSize=10000;
		var interval=maxSize/(data.length+1);
		var z = 0;
		var x = 0;
		var material = new THREE.LineBasicMaterial( { color: 0xffffff } );
		var geometry = new THREE.Geometry();
		for (var i=0;i<data.length;i++){
			z += interval;
			if (data[i].component.scope!==undefined){
				x=scopes[data[i].component.scope];
				geometry.vertices.push(
					new THREE.Vector3( x, 0, z )
				);
			}
		}
		var line = new THREE.Line( geometry, material );
		return line;
	};

	function dotGrid(data,scopes,maxSize){
		var dotSteps=maxSize/data.length;
		for (var key in scopes){
			var dotX=scopes[key];
			for (var i=0;i<data.length;i++){
				var opts={};
				opts.scale=10;
				opts.x=dotX;
				opts.z=dotSteps*i;
				scene.add(subroutines.Dflt(opts) );
			}
		}
	}



	function Composite(data){
		var composite=new THREE.Object3D();
		composite.maxSize=10000;
		var interval=composite.maxSize/(data.length+1);
		var z=composite.maxSize/2;
		var scopeStack=[];
		var x=0;
		for (var i=0;i<data.length;i++){
			z+= 10;
			if (data[i].component.scope!==undefined){
				var scope=data[i].component.scope;
				//handle scope stack here
				x=scopes[data[i].component.scope];
			}
			var radius=500;
			if (data[i].component.block && data[i].component.block>0){
				radius=200;
			}
			var shape;
			if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].for!=="cycle"){
				shape = subroutines.Loop( {z:z,x:x} );
			} else {
				shape = subroutines.Fun( {z:z,x:x} );
			}
			
			//don't forget to handle the x coordinate for the tic marks
			shape.componentData=data[i].component;
			shape.collapse=new TWEEN.Tween(shape.position).to({z:(composite.maxSize/2)+(10*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			shape.expand=new TWEEN.Tween(shape.position).to({z:((interval)+interval*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			composite.add( shape );
			
			
			if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].for==="cycle"){
				
				var steps=60;
				var planeInterval = 360/steps;
				var radianInterval = (2*Math.PI)/steps;
				//var ticHalo=new THREE.Geometry();
				for (var j=0;j<steps;j++){
					var ticGeometry = new THREE.PlaneBufferGeometry( 30, 10 );
					var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
					var plane = new THREE.Mesh( ticGeometry, material );
					plane.grayness=1;
					plane.position.z=z;
					plane.position.x=x;
					plane.rotation.z-=radianInterval*j;
					var coords = geo.getPoint(plane.position.x,plane.position.y,radius,planeInterval*j);
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
	
	};	


	/*

	function Composite(data){
		console.log(data);
		
		var composite=new THREE.Object3D();
		composite.maxSize=10000;var interval=composite.maxSize/(data.length+1);
		var z=composite.maxSize/2;
		
		for (var i=0;i<data.length;i++){
			z+= 10;
			var shape;
			if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].for!=="cycle"){
				shape = subroutines.Loop( {z:z} );
			} else {
				shape = subroutines.Fun( {z:z} );
			}
			
			
			shape.componentData=data[i].component;
			shape.collapse=new TWEEN.Tween(shape.position).to({z:(composite.maxSize/2)+(10*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			shape.expand=new TWEEN.Tween(shape.position).to({z:((interval)+interval*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
			composite.add( shape );
			
			
			if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].for==="cycle"){
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
					var coords = utils.getPoint(plane.position.x,plane.position.y,radius,planeInterval*j);
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
	
	};	
	
	*/
	
	
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
		controls.update();
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
		// effect.render( scene, camera );			// This is used for stereoEffect
		sceneRendered = true;
	}
	
};
