var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var Label = function (composite, options) {
  
  // create copies so that you can set primary to false and avoid them as you move through timeline nodes
  options.componentData = JSON.parse(JSON.stringify(options.componentData));
  options.componentData.primary = false;
  
  ///canvas madness starts here
  var message = options.componentData.value;
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
  sprite.position.set(0,50,options.z1);
  sprite.grayness=0.2;
  
  sprite.componentData=options.componentData;
  sprite=utils.tweenify(sprite,{z1: options.z1, z2:options.z2, x1:options.x1, x2:options.x2} );
  
  composite.add( sprite );
};

module.exports = Label;