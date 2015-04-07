var THREE = require('three');
var TWEEN = require('tween.js');

var constants = require('./Constants');

var utils={};

utils.checkDefaults = function (position) {
  if (!position) {
    position = {
      x: 0, x1: 0, x2: 0,
      y: 0, y1: 0, y2: 0,
      z: 0, z1: 0, z2: 0
    }
  }

  return position;
}

utils.getPoint = function(x, y, r, theta){
  theta += 90;
  theta = theta * (Math.PI/180);
  var x2 = x + (r*Math.sin(theta));
  var y2 = y + (r*Math.cos(theta));
  var circle = {x1:x, y1:y, r:r, x2:x2, y2:y2};
  return circle;
};

utils.arcPath=function(x,y,r,theta1,theta2,w){
	var f1=0;
	var f2=0;
	var f3=0;
	var f4=1;
	if ((theta2-theta1)>180){
		f1=1;
		f3=1;
		}
	
	var arcPath="";
	arcPath+="M "+utils.getPoint(x,y,r,theta1).x2+" "+utils.getPoint(x,y,r,theta1).y2;
	arcPath+=" A "+r+" "+r+" "+(theta2-theta1)+" "+f1+" "+f2+" "+utils.getPoint(x,y,r,theta2).x2+" "+utils.getPoint(x,y,r,theta2).y2;
	arcPath+=" L "+utils.getPoint(x,y,(r-w),theta2).x2+" "+utils.getPoint(x,y,(r-w),theta2).y2;
	arcPath+=" A "+(r-w)+" "+(r-w)+" "+(theta2-theta1)+" "+f3+" "+f4+" "+utils.getPoint(x,y,(r-w),theta1).x2+" "+utils.getPoint(x,y,(r-w),theta1).y2;
	arcPath+=" Z";
	return arcPath;
};

    
utils.allValues = function(timeline, target){
  var r = [];
  
  for (var i=0; i < timeline.length; i++){
    if (target === timeline[i].id && timeline[i].value !== undefined){
      r.push( JSON.stringify(timeline[i].value) );
    }
  }
  
  return r;
};   

utils.tweenify=function(object, position){
  position = utils.checkDefaults(position);
  
  var easingType = "Quintic";
  var tweenDuration = constants.time.tweenDuration;

  var expand = {};
  expand.x = new TWEEN.Tween(object.position).to({x: position.x2}, tweenDuration).easing(TWEEN.Easing[easingType].Out);
  expand.y = new TWEEN.Tween(object.position).to({y: position.y2}, tweenDuration).easing(TWEEN.Easing[easingType].Out);
  expand.z = new TWEEN.Tween(object.position).to({z: position.z2}, tweenDuration).easing(TWEEN.Easing[easingType].Out);

  var collapse = {};
  collapse.x = new TWEEN.Tween(object.position).to({x: position.x1}, tweenDuration).easing(TWEEN.Easing[easingType].Out);
  collapse.y = new TWEEN.Tween(object.position).to({y: position.y1}, tweenDuration).easing(TWEEN.Easing[easingType].Out);
  collapse.z = new TWEEN.Tween(object.position).to({z: position.z1}, tweenDuration).easing(TWEEN.Easing[easingType].Out);

  object.collapse = collapse.y;
  collapse.y.chain(collapse.z);
  collapse.z.chain(collapse.x);

  object.expand = expand.x;
  expand.x.chain(expand.z);
  expand.z.chain(expand.y);

  return object;
};



module.exports = utils;
