var geometries = {};

geometries.hexagon = new THREE.TorusGeometry(50, 10, 3, 3);
geometries.functionDeclaration= new THREE.OctahedronGeometry(50);
geometries.objectDeclaration = new THREE.IcosahedronGeometry(50);
geometries.triangle = new THREE.RingGeometry(100, 5, 3, 3);
geometries.loop = new THREE.TorusGeometry(500, 20, 5, 30);
geometries.functionInvocation = new THREE.CylinderGeometry(100, 50, 80, 6, 1, true);
geometries.variable = new THREE.DodecahedronGeometry(25);
geometries.dfltMaterial = new THREE.SpriteMaterial({});

module.exports = geometries;