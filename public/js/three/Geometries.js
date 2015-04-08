var THREE = require('three');
var TWEEN = require('tween.js');

var constants = require('./Constants');

var geometries = {};
var PI = Math.PI;

//--TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
geometries.hexagon = new THREE.TorusGeometry(50, 10, 3, 3);

//--OctahedronGeometry(radius, detail)
geometries.functionDeclaration = new THREE.OctahedronGeometry(50);

//--IcosahedronGeometry(radius, detail)
geometries.objectDeclaration = new THREE.IcosahedronGeometry(50);

//--RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength)
geometries.triangle = new THREE.RingGeometry(100, 5, 3, 3);

//--TorusGeometry(radius, tube, radialSegments, tubularSegments, arc)
geometries.loop = new THREE.TorusGeometry(constants.size.radius, 20, 5, 30);

//--CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
geometries.functionInvocation = new THREE.CylinderGeometry(70, 35, 60, 6, 1, true);

//--DodecahedronGeometry(radius, detail)
geometries.variable = new THREE.DodecahedronGeometry(25);

//--BoxGeometry(width, height, depth, widthSegments, heightSegments, depthSegments)
geometries.arrayIndex =  new THREE.BoxGeometry( constants.size.arayIndex, constants.size.arayIndex, constants.size.arayIndex );

//--CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
// geometries.conditionalBranch = new THREE.CylinderGeometry(40, 0, 20, 4, 1, true);
geometries.conditionalBranch = new THREE.CylinderGeometry(40, 40, 30, 2, 1, true, 0, PI);
geometries.conditionalBranch.close = new THREE.CylinderGeometry(40, 40, 30, 3, 1, true, 0, PI);
geometries.conditionalBranch.open = new THREE.CylinderGeometry(40, 40, 30, 3, 1, true, 0, PI);


geometries.dfltMaterial = new THREE.SpriteMaterial({});

module.exports = geometries;