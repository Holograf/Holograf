var subroutines={};

// inside methods propertize, elementize, labelize - create 


subroutines.Fun=function(composite, opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var x=opts.x1;
	var z1=opts.z1;
	var z2=opts.z2;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.variableGeometry);
	var grayness = 0.5;
	var material=new THREE.MeshLambertMaterial({});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( x, 0, z1 );
	object.rotation.x=-1*(Math.PI/2);
	composite.add(object);
	
	if (opts.componentData.type==='property'){
		subroutines.propertize(composite,opts);
	} else if (opts.componentData.type==='element'){
		subroutines.elementize(composite,opts);
	}
	
	if (opts.componentData.value!==undefined){
		subroutines.labelize(composite,opts);
	}
	
};

subroutines.ArrayDeclaration=function(composite, opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.x2===undefined){opts.x2=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var geometry = Object.create(subroutines.functionDeclarationGeometry);
	var grayness = 0.5;
	var material=new THREE.MeshBasicMaterial({});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( opts.x1, 0, opts.z1 );
	composite.add(object);
	
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		100, 100,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 4 ) );
	var geometry = path.createPointsGeometry( 4 );
	var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	
	// Create the final Object3d to add to the scene
	var ellipse = new THREE.Line( geometry, material );
	ellipse.componentData=opts.componentData;
	ellipse.grayness = grayness;
	ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	
	ellipse.position.set( opts.x1, 0, opts.z1 );
	ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},6000).repeat(Infinity).start();
	
	composite.add(ellipse);
			
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		75, 75,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 4 ) );
	var geometry = path.createPointsGeometry( 4 );
	var ellipse = new THREE.Line( geometry, material );
	ellipse.componentData=opts.componentData;
	ellipse.grayness = grayness;
	ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	ellipse.position.set( opts.x1, 0, opts.z1 );
	ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},3000).repeat(Infinity).start();
	
	composite.add(ellipse);
};

subroutines.ObjectDeclaration=function(composite, opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.x2===undefined){opts.x2=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var geometry = Object.create(subroutines.objectDeclarationGeometry);
	var grayness = 0.9;
	var material=new THREE.MeshBasicMaterial({});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( opts.x1, 0, opts.z1 );
	composite.add(object);
	
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		100, 100,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 50 ) );
	var geometry = path.createPointsGeometry( 50 );
	var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
	
	// Create the final Object3d to add to the scene
	var ellipse = new THREE.Line( geometry, material );
	ellipse.componentData=opts.componentData;
	ellipse.grayness = grayness;
	ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	
	ellipse.position.set( opts.x1, 0, opts.z1 );
	ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({x:2*Math.PI},6000).repeat(Infinity).start();
	
	composite.add(ellipse);
			
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		75, 75,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 50 ) );
	var geometry = path.createPointsGeometry( 50 );
	var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
	
	var ellipse = new THREE.Line( geometry, material );
	ellipse.componentData=opts.componentData;
	ellipse.grayness = grayness;
	ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	ellipse.position.set( opts.x1, 0, opts.z1 );
	ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},3000).repeat(Infinity).start();
	
	composite.add(ellipse);
};

subroutines.FunctionDeclaration=function(composite, opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x===undefined){opts.x=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var x=opts.x;
	var z1=opts.z1;
	var z2=opts.z2;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.functionDeclarationGeometry);
	var grayness = 0.9;
	var material=new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( x, 0, z1 );
	composite.add(object);
};

subroutines.FunctionInvocation=function(composite, opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x===undefined){opts.x=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var x=opts.x;
	var z1=opts.z1;
	var z2=opts.z2;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.funGeometry);
	var grayness = 0.9;
	var material=new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( x, 0, z1 );
	object.rotation.x=(Math.PI/2);
	composite.add(object);
};

subroutines.FunctionReturn=function(composite, opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x===undefined){opts.x=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var x=opts.x;
	var z1=opts.z1;
	var z2=opts.z2;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.funGeometry);
	var grayness = 0.9;
	var material=new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( x, 0, z1 );
	object.rotation.x=-1*(Math.PI/2);
	composite.add(object);
};

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

subroutines.Conditional=function(composite,opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var x=opts.x1;
	var z1=opts.z1;
	var z2=opts.z2;
	var geometry = Object.create(subroutines.hexagonGeometry);
	var grayness = 0.7;
	if (opts.componentData.if && opts.componentData.if==='close'){
		grayness = 0.1;
	}
	var material=new THREE.MeshPhongMaterial({metal:true});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object.componentData.primary=true;
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
		
	object.rotate=new TWEEN.Tween(object.rotation).to({z:2*Math.PI},(opts.componentData.hasOwnProperty('enter') ) ? 3000 : -3000).repeat(Infinity).start();
		
	object.position.set( x, 0, z1 );
	composite.add(object);
};

subroutines.Loop=function(composite,opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var x=opts.x1;
	var z1=opts.z1;
	var z2=opts.z2;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.loopGeometry);
	var grayness = 0.5;
	var material=new THREE.MeshLambertMaterial({});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( x, 0, z1 );
	composite.add(object);
};

subroutines.LoopCycle=function(composite,opts){
	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	var steps=60;
	var planeInterval = 360/steps;
	var radianInterval = (2*Math.PI)/steps;
	var group = new THREE.Object3D();
	for (var j=0;j<steps;j++){
		var ticGeometry = new THREE.PlaneBufferGeometry( 30, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( ticGeometry, material );
		plane.grayness=1;
		// plane.position.z=opts.z1;
		plane.position.x=opts.x1;
		plane.rotation.z-=radianInterval*j;
		var coords = utils.getPoint(plane.position.x,plane.position.y,opts.radius,planeInterval*j);
		plane.position.x=coords.x2;
		plane.position.y=coords.y2;

		
		plane.componentData=opts.componentData;
		// plane=utils.tweenify(plane,{z1: opts.z1, z2:opts.z2, x1:plane.position.x, x2:plane.position.x+opts.x2} );
		group.add( plane );
	}
	group.componentData=opts.componentData;
	group.position.z = opts.z1;
	group=utils.tweenify(group,{z1: opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	group.rotate=new TWEEN.Tween(group.rotation).to({z:2*Math.PI},(opts.componentData.hasOwnProperty('enter') ) ? 90000 : -90000).repeat(Infinity).start();
	composite.add( group );
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
	var interval = maxSize / 10;
	var material = new THREE.LineBasicMaterial( { color: 0x555555 } );
	var yMod = 500;
	// back horizontal
	y = -maxSize+yMod;
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

		geometry.vertices.push( new THREE.Vector3( -maxSize, -maxSize+yMod, z))
		geometry.vertices.push( new THREE.Vector3( x, -maxSize+yMod, z ) );
		geometry.vertices.push( new THREE.Vector3( x, maxSize+yMod, z ) );
		
		var line = new THREE.Line( geometry, material );
		scene.add(line);
	}


	// bottom horizontal
	x = -maxSize - interval;
	while (x < 2 * maxSize) {
		var geometry = new THREE.Geometry();
		y = -maxSize+yMod;
		x += interval; 

		geometry.vertices.push( new THREE.Vector3( x, y, -maxSize ) );
		geometry.vertices.push( new THREE.Vector3( x, y, 2 * maxSize ) );
		
		var line = new THREE.Line( geometry, material );
		scene.add(line);
	}

};

subroutines.elementize=function(composite,opts){

	// create copies so that you can set primary to false and avoid them as you move through timeline nodes
	opts.componentData = JSON.parse(JSON.stringify(opts.componentData));
	opts.componentData.primary = false;

	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.x2===undefined){opts.x2=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		50, 50,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 4 ) );
	var geometry = path.createPointsGeometry( 4 );
	var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	
	// Create the final Object3d to add to the scene
	var ellipse = new THREE.Line( geometry, material );
	ellipse.grayness = 0.8;
	ellipse.componentData=opts.componentData;
	ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	
	ellipse.position.set( opts.x1, 0, opts.z1 );
	ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({y:2*Math.PI},3000).repeat(Infinity).start();
	
	composite.add(ellipse);
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



subroutines.propertize=function(composite,opts){

	// copy obj to set primary to false and avoid them as you move through timeline nodes
	opts.componentData = JSON.parse(JSON.stringify(opts.componentData));
	opts.componentData.primary = false;

	if (opts===undefined){var opts={};}
	if (opts.z1===undefined){opts.z1=0;}
	if (opts.z2===undefined){opts.z2=0;}
	if (opts.x1===undefined){opts.x1=0;}
	if (opts.x2===undefined){opts.x2=0;}
	if (opts.componentData===undefined){opts.componentData={};}
	
	var curve = new THREE.EllipseCurve(
		opts.x1,  0,            // ax, aY
		50, 50,           // xRadius, yRadius
		0,  2 * Math.PI,  // aStartAngle, aEndAngle
		false             // aClockwise
	);
	
	var path = new THREE.Path( curve.getPoints( 50 ) );
	var geometry = path.createPointsGeometry( 50 );
	var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
	
	// Create the final Object3d to add to the scene
	var ellipse = new THREE.Line( geometry, material );
	ellipse.componentData=opts.componentData;
	ellipse.grayness = 0.8;
	ellipse=utils.tweenify(ellipse,{z1:opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	
	ellipse.position.set( opts.x1, 0, opts.z1 );
	ellipse.rotate = new TWEEN.Tween(ellipse.rotation).to({x:2*Math.PI},6000).repeat(Infinity).start();
	
	composite.add(ellipse);
};

subroutines.labelize=function(composite,opts){
	
	// create copies so that you can set primary to false and avoid them as you move through timeline nodes
	opts.componentData = JSON.parse(JSON.stringify(opts.componentData));
	opts.componentData.primary = false;
	
	///canvas madness starts here
	var message=opts.componentData.hasOwnProperty('value') ? opts.componentData.value : "Yo!";
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	context.font = "120px Courier";
  context.textAlign = 'left';
  context.textBaseline = 'middle';
	// get size data (height depends only on font size)
	var metrics = context.measureText( message );
	var textWidth = metrics.width;
	
	// background color
	context.fillStyle   = "rgba(255,255,255,1)";


	context.fillText( message, 50, 50);
	
	// canvas contents will be used for a texture
	var texture = new THREE.Texture(canvas) 
	texture.needsUpdate = true;

	var spriteMaterial = new THREE.SpriteMaterial( 
		{ map: texture, useScreenCoordinates: false, transparent:true, opacity:0} );
	var sprite = new THREE.Sprite( spriteMaterial );
	sprite.scale.set(100,100,1.0);
	sprite.rotation.x=Math.PI/2;
	sprite.position.set(0,50,opts.z1);
	sprite.grayness=0.2;
	
	sprite.componentData=opts.componentData;
	sprite=utils.tweenify(sprite,{z1: opts.z1, z2:opts.z2, x1:opts.x1, x2:opts.x2} );
	
	composite.add( sprite );
	
};

subroutines.Composite = function(data,scopes,particleLight){
	
	//console.log(data);
	
	var composite=new THREE.Object3D();
	composite.maxSize=100*data.length;
	var buffer=10;
	var leftMargin=(composite.maxSize/2) - ((data.length*buffer)/2);
	var interval=composite.maxSize/(data.length+1);
	var z1, z2;
	var x=0;
	
	var cycleTime=1000*data.length;
	var cycleStep=cycleTime/data.length;
	var animations = [];
	
	animations.push(new TWEEN.Tween(particleLight.position).to({x:x}, cycleStep) );
	//var nextTween = animations.push(new TWEEN.Tween(particleLight.material).to({opacity:1},300) );

	//animations[0].chain(nextTween);

	for (var i=0;i<data.length;i++){
		z1 = leftMargin + (buffer*i);
		z2 = ((interval)+interval*i);
		if (data[i].return!==undefined){
			x-=500;
		}
		//i know i know, single letter variables are lame
		//but i need to type this a lot, so c is just the current element
		var c=data[i].component;
		var radius=500;
		if (data[i].component.block && data[i].component.block>0){
			radius=200;
		}
		
		
		
		//all the possible heiroglyphs
		var opts={z1:z1, z2:z2, x1:0, x2:x, componentData:data[i].component, radius:radius} ;
		
		
		//console.log(data[i].component.time);
		
		var delorian=100;
		if (i<data.length-1 && typeof data[i].component.time==='number' && typeof data[i+1].component.time==='number') {
			delorian=2000*(data[i+1].component.time-data[i].component.time);
		}
		nextTween=new TWEEN.Tween(particleLight.position).to({x:x, z:z2}, delorian);
		animations.push(nextTween);
		animations[i].chain(animations[i+1]);

		
		
		
		if (c.pointsTo!==undefined && c.pointsTo.type && c.pointsTo.type==='array') {
			subroutines.ArrayDeclaration(composite, opts);
		} else if (c.pointsTo!==undefined && c.pointsTo.type && c.pointsTo.type==='object') {
			subroutines.ObjectDeclaration(composite, opts);
		} else if (data[i].component.hasOwnProperty('pointsTo') && data[i].component.pointsTo.type==='function'){
			subroutines.FunctionDeclaration(composite,opts);
		} else if (data[i].component.type==="block" && data[i].component.name==="if"){
			subroutines.Conditional(composite, opts);
		} else if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].for!=="cycle"){
			subroutines.Loop(composite, opts);
		} else if (data[i].invoke!==undefined) {
			subroutines.FunctionInvocation(composite,opts);
		} else if (data[i].return !==undefined){
			subroutines.FunctionReturn(composite,opts);
		} else if (data[i].component.type==="block" && data[i].component.name==="for" && data[i].for==="cycle"){
			subroutines.LoopCycle(composite,opts);
		} else {
			subroutines.Fun(composite, opts);
		}
		
		
		
		
		if (data[i].invoke!==undefined){
			x+=500;
		}
		
	}
	//nextTween = new TWEEN.Tween(particleLight.material).to({opacity:0},300); 
	//animations.push(nextTween);
	
	animations[animations.length-1].chain(animations[0]);
	particleLight.tween=animations[0];
	
	// console.log(data);
	return composite;
};	

subroutines.hexagonGeometry=new THREE.TorusGeometry(50,10,3,3);
subroutines.functionDeclarationGeometry=new THREE.OctahedronGeometry(50);
subroutines.objectDeclarationGeometry=new THREE.IcosahedronGeometry(50);
subroutines.triangleGeometry=new THREE.RingGeometry(100,5,3,3);
subroutines.loopGeometry=new THREE.TorusGeometry(500,20,5,30);
subroutines.funGeometry=new THREE.CylinderGeometry(100,50,80,6,1,true);
subroutines.variableGeometry=new THREE.DodecahedronGeometry(25);
subroutines.dfltMaterial=new THREE.SpriteMaterial({});