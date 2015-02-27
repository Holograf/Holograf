var subroutines={};

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
	object=utils.tweenify(object,{z1: z1, z2:z2, x1:opts.x1, x2:opts.x2} );
		
	object.position.set( x, 0, z1 );
	object.rotation.x=-1*(Math.PI/2);
	composite.add(object);
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
	var grayness = 0;
	var material=new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
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
	var grayness = 0;
	var material=new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
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
	var grayness = 0;
	var material=new THREE.MeshBasicMaterial({wireframe:true, side: THREE.DoubleSide});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.componentData=opts.componentData;
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
	for (var j=0;j<steps;j++){
		var ticGeometry = new THREE.PlaneBufferGeometry( 30, 10 );
		var material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
		var plane = new THREE.Mesh( ticGeometry, material );
		plane.grayness=1;
		plane.position.z=opts.z1;
		plane.position.x=opts.x1;
		plane.rotation.z-=radianInterval*j;
		var coords = utils.getPoint(plane.position.x,plane.position.y,opts.radius,planeInterval*j);
		plane.position.x=coords.x2;
		plane.position.y=coords.y2;
		
		plane.componentData=opts.componentData;
		plane=utils.tweenify(plane,{z1: opts.z1, z2:opts.z2, x1:plane.position.x, x2:plane.position.x+opts.x2} );
		composite.add( plane );
	}
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
	var maxSize=data.length*100;
	var interval=maxSize/(data.length+1);
	var z = 0;
	var x = 0;
	var material = new THREE.LineBasicMaterial( { color: 0xffffff, transparent:true, opacity:0 } );
	var geometry = new THREE.Geometry();
	for (var i=0;i<data.length;i++){
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
	composite.maxSize=100*data.length;
	var buffer=10;
	var leftMargin=(composite.maxSize/2) - ((data.length*buffer)/2);
	var interval=composite.maxSize/(data.length+1);
	var z1, z2;
	var scopeStack=[];
	var x=0;
	for (var i=0;i<data.length;i++){
		z1 = leftMargin + (buffer*i);
		z2 = ((interval)+interval*i);
		if (data[i].return!==undefined){
			x-=500;
		}
		
		
		var radius=500;
		if (data[i].component.block && data[i].component.block>0){
			radius=200;
		}
		
		
		//all the possible heiroglyphs
		var opts={z1:z1, z2:z2, x1:0, x2:x, componentData:data[i].component, radius:radius} ;
		if (data[i].component.value && data[i].component.value==='___function code'){
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
	return composite;
};	

/*

TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)

radius — Default is 100. 
tube — Diameter of the tube. Default is 40. 
radialSegments — Default is 8 
tubularSegments — Default is 6. 
arc — Central angle. Default is Math.PI * 2.

*/
subroutines.hexagonGeometry=new THREE.TorusGeometry(50,10,3,3);
subroutines.functionDeclarationGeometry=new THREE.OctahedronGeometry(50);
subroutines.triangleGeometry=new THREE.RingGeometry(100,5,3,3);
subroutines.loopGeometry=new THREE.TorusGeometry(500,20,20,30);
subroutines.funGeometry=new THREE.CylinderGeometry(100,50,80,6,1,true);
subroutines.variableGeometry=new THREE.DodecahedronGeometry(25);
subroutines.dfltMaterial=new THREE.SpriteMaterial({});