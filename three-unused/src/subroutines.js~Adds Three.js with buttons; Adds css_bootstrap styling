var subroutines={};

subroutines.Fun=function(opts){
	var z=opts.z;
	var geometry = Object.create(subroutines.variableGeometry);
	var material=new THREE.MeshLambertMaterial();
	var object = new THREE.Mesh( geometry , material );
	var grayness = Math.random() * 0.5 + 0.25;
	material.color.setRGB( grayness, grayness, grayness );
	object.grayness=grayness;
	object.position.set( 0, 0, z );
	return object;
};

subroutines.Loop=function(opts){
	var z=opts.z;
	var r=opts.r || 300;
	var geometry = Object.create(subroutines.loopGeometry);
	var grayness = Math.random() * 0.5 + 0.25;
	var material=new THREE.MeshLambertMaterial({});
	material.color.setRGB( grayness, grayness, grayness );
	var object = new THREE.Mesh(geometry, material );

	object.grayness=grayness;
	object.position.set( 0, 0, z );
	return object;
};

subroutines.loopGeometry=new THREE.TorusGeometry(500,20,20,30);
subroutines.variableGeometry=new THREE.IcosahedronGeometry(100);