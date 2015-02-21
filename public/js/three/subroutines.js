var subroutines={};

subroutines.Fun=function(opts){
	if (opts===undefined){var opts={};}
	if (opts.z===undefined){opts.z=0;}
	if (opts.x===undefined){opts.x=0;}
	var z=opts.z;
	var x=opts.x;
	var geometry = Object.create(subroutines.variableGeometry);
	var material=new THREE.MeshLambertMaterial();
	var object = new THREE.Mesh( geometry , material );
	var grayness = Math.random() * 0.5 + 0.25;
	material.color.setRGB( grayness, grayness, grayness );
	object.grayness=grayness;
	object.position.set( x, 0, z );
	return object;
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


subroutines.Loop=function(opts){
	if (opts===undefined){var opts={};}
	if (opts.z===undefined){opts.z=0;}
	if (opts.x===undefined){opts.x=0;};
	var x=opts.x;
	var z=opts.z;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.loopGeometry);
	var grayness = Math.random() * 0.5 + 0.25;
	var material=new THREE.MeshLambertMaterial({});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.position.set( x, 0, z );
	return object;
};

	
subroutines.TimeLight=function(start,end) {
	if (start===undefined){var start=0;}
	if (end===undefined){var end=10000;}
	var particleLight = new THREE.Mesh( new THREE.SphereGeometry( 0, 0, 0 ), new THREE.MeshBasicMaterial( { color: 0xffffff } ) );
	var pointLight = new THREE.PointLight( 0xffffff, 2 );
	particleLight.add( pointLight );
	particleLight.tween=new TWEEN.Tween(particleLight.position).to({z:end},5000).easing(TWEEN.Easing.Quadratic.InOut);
	return particleLight;
};
	

subroutines.VisualTimeline=function (data,scopes){
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


subroutines.dotGrid=function(scene,data,scopes,maxSize){
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

subroutines.Composite = function(data,scopes){
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
		shape=utils.tweenify(shape,{z1: (composite.maxSize/2)+(10*i), z2:((interval)+interval*i)} );
		/*
		shape.collapse=new TWEEN.Tween(shape.position).to({z:(composite.maxSize/2)+(10*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
		shape.expand=new TWEEN.Tween(shape.position).to({z:((interval)+interval*i)},1500).easing(TWEEN.Easing.Quadratic.InOut);
		*/
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



subroutines.loopGeometry=new THREE.TorusGeometry(500,20,20,30);
subroutines.variableGeometry=new THREE.IcosahedronGeometry(100);
subroutines.dfltMaterial=new THREE.SpriteCanvasMaterial({
	program: function(context){
		context.beginPath();
		context.arc( 0, 0, 0.5, 0, 2*Math.PI, true );
		context.fill();
	}
});