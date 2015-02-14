var subroutines={};

subroutines.fun=function(opts){
	var z=opts.z;
	var geometry=opts.geometry || new THREE.IcosahedronGeometry(30);
	material=new THREE.MeshLambertMaterial();
	object = new THREE.Mesh( geometry , material );
	object.position.set( 0, 0, z );
	return object;
};

subroutines.loop=function(opts){
	var z=opts.z;
	var r=opts.r || 300;
	var geometry=opts.geometry ||  new THREE.TorusGeometry( r, 20, 20, 50 );
	material=new THREE.MeshLambertMaterial();
	object = new THREE.Mesh(geometry, material );
	object.position.set( 0, 0, z );
	return object;
};