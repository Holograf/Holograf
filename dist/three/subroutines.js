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

subroutines.loopGeometry=new THREE.TorusGeometry(500,20,20,30);
subroutines.variableGeometry=new THREE.IcosahedronGeometry(100);
subroutines.dfltMaterial=new THREE.SpriteCanvasMaterial({
	program: function(context){
		context.beginPath();
		context.arc( 0, 0, 0.5, 0, 2*Math.PI, true );
		context.fill();
	}
});