var subroutines={};

subroutines.fun=function(opts){
	var z=opts.z;
	var r= _.random(50,100);
	material=new THREE.MeshLambertMaterial();
	object = new THREE.Mesh( new THREE.TorusGeometry( r, 20, 10, 6 ), material );
	
	object.position.set( 0, 0, z );
	return object;
};

subroutines.loop=function(opts){
	var z=opts.z;
	var r= _.random(400,600);
	material=new THREE.MeshLambertMaterial();
	object = new THREE.Mesh( new THREE.TorusGeometry( r, 20, 20, 50 ), material );
	object.position.set( 0, 0, z );
	return object;
};