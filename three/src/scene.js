var displayScene=function(){	
	var data=utils.mockData(30);
	var container;
	var camera, scene, renderer, group, particle, particleLight;
	var mouseX = 0, mouseY = 0;
	
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	
	init(data);
	animate();
	

	function init(data) {
		container = document.createElement( 'div' );
		document.body.appendChild( container );

		camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
		camera.position.z = -1000;
		camera.position.y = 4000;
		camera.position.x = 4000;
		
		
		controls = new THREE.OrbitControls( camera );
		controls.addEventListener( 'change', render );
		
		scene = new THREE.Scene();

		//the execution
		particleLight = new THREE.Mesh( new THREE.SphereGeometry( 0, 0, 0 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
		scene.add( particleLight );
		var pointLight = new THREE.PointLight( 0xffffff, 2 );
		particleLight.add( pointLight );
		
		//the dataLine
		var geometry = new THREE.CylinderGeometry( 5, 5, 3000, 3 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffffff} );
		var dataLine = new THREE.Mesh( geometry, material );
		dataLine.rotation.x+=Math.PI/2;
		scene.add( dataLine );


		//deck
		var geometry = new THREE.BoxGeometry( 1000, 10, 1000 );
		var material = new THREE.MeshLambertMaterial(/*{wireframe:true} */);
		var deck = new THREE.Mesh( geometry, material );
		deck.translateY(-500);
		//scene.add( deck );
	
	
		//loop torus
		var z=-3000;
		for (var i=0;i<data.length;i++){
			z+= i*100;
			if (data[i].shape==="function"){
				scene.add( subroutines.fun( {z:z} ));
			} else {
				scene.add( subroutines.loop( {z:z} ));
			}
		}
	
		//csg experiment
		
		var cube_geometry = new THREE.CubeGeometry( 30, 30, 300 );
		var cube_mesh = new THREE.Mesh( cube_geometry );
		//cube_mesh.position.x = -7;
		var cube_bsp = new ThreeBSP( cube_mesh );
		var sphere_geometry = new THREE.SphereGeometry( 50, 32, 32 );
		var sphere_mesh = new THREE.Mesh( sphere_geometry );
		sphere_mesh.position.x = -7;
		var sphere_bsp = new ThreeBSP( sphere_mesh );
		
		var subtract_bsp = cube_bsp.subtract( sphere_bsp );
		var result = subtract_bsp.toMesh( new THREE.MeshLambertMaterial({ shading: THREE.SmoothShading}) );
		result.geometry.computeVertexNormals();
		scene.add( result );
		
		//end experiment
		
	
		renderer = new THREE.CanvasRenderer();
		renderer.setClearColor( 0x333333, 1);
		renderer.setSize( window.innerWidth-20, window.innerHeight-20 );
		container.appendChild( renderer.domElement );
		window.addEventListener( 'resize', onWindowResize, false );
	
	}
	
	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
	function animate() {
		requestAnimationFrame( animate );
		render();
	}
	
	function render() {
		camera.lookAt(new THREE.Vector3(256,256,256));

		particleLight.position.z +=100;
		if (particleLight.position.z>10000){
			particleLight.position.z=-10000;
		}
		
		renderer.render( scene, camera );
	}
	
};

window.onload=displayScene;