var utils = require('./utils');
var geometries = require('./Geometries');
var generate = require('./generators/Generators');

var subroutines={};

subroutines.Dflt=function(opts){
	if (opts===undefined){var opts={};}
	if (opts.z===undefined){opts.z=0;}
	if (opts.x===undefined){opts.x=0;};
	var z=opts.z;
	var x=opts.x;
	particle = new THREE.Sprite( subroutines.dfltMaterial );
	particle.position.x = opts.x===undefined ? 0 : opts.x ;
	particle.position.y = opts.y===undefined ? 0 : opts.y ;
	particle.position.z = opts.z===undefined ? 0 : opts.z ;
	particle.grayness = 0.5;
	particle.scale.x = particle.scale.y = opts.scale || 100;
	return particle;
};

subroutines.TimeLight=function(composite) {
	var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 20, 0, 0 ), new THREE.MeshBasicMaterial( { color: 0xffffff, transparent:true, opacity:0 } ) );
	var pointLight = new THREE.PointLight( 0xffffff, 2 );
	particleLight.add( pointLight );
	return particleLight;
};
	
subroutines.VisualTimeline=function (data,scopes){
	var maxSize=data.length*100;
	var interval=maxSize/(data.length+1);
	var z = 0;
	var x = 0;
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, transparent:true, opacity:0 } );
	var geometry = new THREE.Geometry();
	for (var i = 0; i < data.length; i++){
		z += interval;
		if (data[i].return!==undefined){
			x-=500;
		}
		geometry.vertices.push(
			new THREE.Vector3( x, 0, z )
		);
		
		if (data[i].invoke!==undefined){
			x+=500;
		}
	}
	var line = new THREE.Line( geometry, material );
	line.show=new TWEEN.Tween(line.material).to({opacity:1},1500).easing(TWEEN.Easing.Exponential.In);
  line.hide=new TWEEN.Tween(line.material).to({opacity:0},1500).easing(TWEEN.Easing.Exponential.Out);
  
	return line;
};


subroutines.dotGrid = function(scene,data,scopes,maxSize) {
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
};

subroutines.skybox = function(scene, maxSize) {
	var x, y, z;
	var maxSize = maxSize >= 1000 ? maxSize : 1000;
	var interval = maxSize / 5;
	var material = new THREE.LineBasicMaterial( { color: 0x555555 } );
	// var yMod = 500;

	// back horizontal
	y = -maxSize; // +yMod;
	while (y < maxSize) {
		var geometry = new THREE.Geometry();
		x = 2 * maxSize;
		y += interval; 

		geometry.vertices.push( new THREE.Vector3( x, y, -maxSize ) );
		geometry.vertices.push( new THREE.Vector3( x, y, 2 * maxSize ) );
		
		var line = new THREE.Line( geometry, material );
		scene.add(line);
	}

	// back  & bottom vertical
	z = -maxSize - interval;
	while (z < 2 * maxSize) {
		var geometry = new THREE.Geometry();
		x = 2 * maxSize;
		z += interval; 

		geometry.vertices.push( new THREE.Vector3( -maxSize, -maxSize, z));   // +yMod (3)
		geometry.vertices.push( new THREE.Vector3( x, -maxSize, z ) );
		geometry.vertices.push( new THREE.Vector3( x, maxSize, z ) );
		
		var line = new THREE.Line( geometry, material );
		scene.add(line);
	}


	// bottom horizontal
	x = -maxSize - interval;
	while (x < 2 * maxSize) {
		var geometry = new THREE.Geometry();
		y = -maxSize;		// +yMod
		x += interval; 

		geometry.vertices.push( new THREE.Vector3( x, y, -maxSize ) );
		geometry.vertices.push( new THREE.Vector3( x, y, 2 * maxSize ) );
		
		var line = new THREE.Line( geometry, material );
		scene.add(line);
	}

};

subroutines.Axes = function(scene) {
	var xLineMaterial = new THREE.LineBasicMaterial( { color: 'yellow'} );
	var yLineMaterial = new THREE.LineBasicMaterial( { color: 'red'} );
	var zLineMaterial = new THREE.LineBasicMaterial( { color: 'green'} );
	
	var xGeometry = new THREE.Geometry();
	xGeometry.vertices.push(	new THREE.Vector3( -10000, 0, 0 ) );
	xGeometry.vertices.push(	new THREE.Vector3( 10000, 0, 0 ) );
	
	var yGeometry = new THREE.Geometry();
	yGeometry.vertices.push(	new THREE.Vector3( 0, -10000, 0 ) );
	yGeometry.vertices.push(	new THREE.Vector3( 0, 10000, 0 ) );
	
	var zGeometry = new THREE.Geometry();
	zGeometry.vertices.push(	new THREE.Vector3( 0, 0, -10000 ) );
	zGeometry.vertices.push(	new THREE.Vector3( 0, 0, 10000 ) );
	
	xLine = new THREE.Line( xGeometry, xLineMaterial );
	yLine = new THREE.Line( yGeometry, yLineMaterial );
	zLine = new THREE.Line( zGeometry, zLineMaterial );

	scene.add(xLine);
	scene.add(yLine);
	scene.add(zLine);
};

subroutines.SelectHalo=function(scene,opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.x2===undefined){opts.x2=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		100, 100,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 6 ) );
	var geometry = path.createPointsGeometry( 6 );
	var material = new THREE.LineBasicMaterial( { color : 0xffff00 , transparent: true, opacity: 0} );
	
	// Create the final Object3d to add to the scene
	var halo = new THREE.Line( geometry, material );
	halo.componentData=opts.componentData;

	halo.position.set( opts.x1, 0, opts.z1 );
	halo.rotation.x=Math.PI/2;
	halo.rotate = new TWEEN.Tween(halo.rotation).to({z:2*Math.PI},3000).repeat(Infinity).start();

	return halo;
};

subroutines.Composite = function(data, scopes, particleLight){
		
	var composite = new THREE.Object3D();
	composite.maxSize = 100 * data.length;
	var buffer = 10;
	var leftMargin = (composite.maxSize / 2) - ((data.length*buffer) / 2);
	var interval = composite.maxSize / (data.length + 1);
	var z1, z2;
	var x = 0;
	
	var cycleTime = 500 * data.length;
	var cycleStep = cycleTime / data.length;
	var animations = [];
	
	animations.push(new TWEEN.Tween(particleLight.position).to({x:x}, cycleStep) );
	

	for (var i = 0; i < data.length; i++) {
		z1 = leftMargin + (buffer * i);
		z2 = ((interval) + interval * i);
		if (data[i].return !== undefined) {
			x-=500;
		}

		var component = data[i].component;
		var radius = 500;
		if (component.block && component.block > 0){
			radius = 200;
		}
		

		//all the possible heiroglyphs
		var options = {
			z1: z1, 
			z2: z2, 
			x1: 0, 
			x2: x, 
			componentData: component, 
			radius:radius
	  };
		
		nextTween = new TWEEN.Tween(particleLight.position).to({x:x, z:z2}, cycleStep);
		animations.push(nextTween);
		animations[i].chain( animations[i+1] );

		
		if (component.pointsTo) {
		  if (component.pointsTo.type === 'array') {
			  generate.array(composite, options);
		  } else if (component.pointsTo.type === 'object') {
			  generate.object(composite, options);
		  } else if (component.pointsTo.type === 'function'){
			  generate.functionDeclaration(composite, options);
		  } 
		} 

		else if (component.type === "block") {
			if (component.name === 'if') {
				generate.conditional(composite, options);				
			}
			else if (component.name === "for" || component.name === 'while' || component.name === 'do') {
				if (data[i][component.name] === "cycle") {
				   generate.loopCycle(composite, options);
				} else {
					 generate.loop(composite, options);
				}
			}
		} 

		else if (component.invoke) {
			x += 500;
			generate.functionInvocation(composite, options);
		} else if (component.return){
			generate.functionReturn(composite, options);
		} else {
			generate.value(composite, options);
		}
		
	}


	animations.push(new TWEEN.Tween(particleLight.position).to({x:0,z:0}, 1) );	
	animations[animations.length - 2].chain(animations[animations.length - 1]);
	animations[animations.length - 1].chain(animations[0]);
	particleLight.tween = animations[0];
	
	// console.log(data);
	return composite;
};	

module.exports = subroutines;