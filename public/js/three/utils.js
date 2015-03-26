var utils={};


utils.checkDefaults = function (options) {
  if (options === undefined){
    var options = {};
  }
  if (options.componentData === undefined) {
    options.componentData = {}; 
  }

  var defaults = ['x', 'x1', 'x2', 'y', 'y1', 'y2', 'z', 'z1', 'z2']
  defaults.forEach(function (key) {
    if (options[key] === undefined) {
      options[key] = 0;
    }
  })

  return options;
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

    
utils.allValues=function(timeline,target){
  var r=[];
  
  for (var i=0;i<timeline.length;i++){
    if (target===timeline[i].id && timeline[i].value!==undefined){
      r.push( JSON.stringify(timeline[i].value) );
    }
  }
  
  return r;
};   

utils.tweenify=function(obj,opts){
  //tweenify is a decorator
  if (obj===undefined){var obj={};}
  if (opts===undefined){var opts={};}
  if (opts.x1===undefined){opts.x1=0;}
  if (opts.x2===undefined){opts.x2=0;}
  if (opts.z1===undefined){opts.z1=0;}
  if (opts.z2===undefined){opts.z2=0;}
  
  var easingType="Quintic";
  var tweenDuration=600;

  var xExpand   = new TWEEN.Tween(obj.position).to({x:opts.x2},tweenDuration).easing(TWEEN.Easing[easingType].Out);
  var zCollapse = new TWEEN.Tween(obj.position).to({z:opts.z1},tweenDuration).easing(TWEEN.Easing[easingType].Out);

  obj.collapse  = new TWEEN.Tween(obj.position).to({x:opts.x1},tweenDuration).chain(zCollapse).easing(TWEEN.Easing[easingType].Out);
  obj.expand    = new TWEEN.Tween(obj.position).to({z:opts.z2},tweenDuration).chain(xExpand).easing(TWEEN.Easing[easingType].Out);
  return obj;
};

utils.dull=function(composite){
	composite.children.forEach(function( shape ) {
		if (shape.grayness){
			shape.material.color.setRGB( shape.grayness, shape.grayness, shape.grayness );
			shape.material.opacity = 0;
		}
	});
};

utils.shine=function(composite,id){
	for (var i=0;i<composite.children.length;i++){
		if (composite.children[i].componentData.id===id && composite.children[i].material.color){
			composite.children[i].material.color.setRGB(1,1,0);
			if (composite.children[i].material.transparent){
			  composite.children[i].material.opacity=1;
			}
		}
	}
};

module.exports = utils;
