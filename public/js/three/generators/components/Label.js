var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Label = function (composite, component) {
  
  ///canvas madness starts here
  var message = component.value;
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
  sprite.position.set(0,50,position.z1);
  sprite.grayness=0.2;
  
  sprite.componentData = component;
  sprite = utils.tweenify(sprite,{z1: position.z1, z2:position.z2, x1:position.x1, x2:position.x2} );
  
  composite.add( sprite );
};

module.exports = Label;