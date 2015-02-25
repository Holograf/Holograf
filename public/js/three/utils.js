utils={};

utils.toGlossary=function(x){
  //x is an array of objects, and we're turning it into a hash where 
  //the id element from each object is it's key
  var glossary={};
  for (var i=0;i<x.length;i++){
    glossary[x[i].id]=x[i];
  }
  return glossary;
};

utils.parseTimeline=function(timeline,components){
  var glossary= utils.toGlossary(components);
  
  for (var i=0;i<timeline.length;i++){
    //deep clone to avoid altering the glossary
    timeline[i].component={};
    for (var key in timeline[i]){
      if (key==='component'){continue;}
      timeline[i].component[key]=timeline[i][key];
    }
    for (var key in glossary[timeline[i].id]){
      //if (key==='id'){continue;}
      timeline[i].component[key]=glossary[timeline[i].id][key];
    }
    timeline[i].component.value=timeline[i].value;
  }

  return timeline;
};

utils.getPoint=function(x,y,r,theta){
  theta+=90;
  theta=theta*(Math.PI/180);
  var x2=x+(r*Math.sin(theta));
  var y2=y+(r*Math.cos(theta));
  var circle={x1:x,y1:y,r:r,x2:x2,y2:y2};
  return circle;
};

utils.extractScopes=function(allData){  
  var scopes={};  
  var scopeX=0;
  for (var key in allData.scopes){
    scopes[key]=scopeX+500;
    scopeX+=500;
  }
  return scopes;
};

utils.displayText=function(obj){
  var d="";
  if (obj.componentData.value && obj.componentData.value==='___function code'){
    d+="<div>function: "+obj.componentData.name+" declaration</div>";
  } else if (obj.componentData.type==='block' && obj.componentData.name==='if' && obj.componentData.hasOwnProperty('enter') ){
    d+="<div>if open</div>";
  } else if (obj.componentData.hasOwnProperty('if') && obj.componentData.if==='close'){
    d+="<div>if close</div>";
  } else if (obj.componentData.hasOwnProperty('invoke') ){
    d+="<div>function: "+obj.componentData.name+" invocation</div>";
  } else if (obj.componentData.hasOwnProperty('return') ) {
    d+="<div>function: "+obj.componentData.name+" returns "+obj.componentData.return+"</div>";
  } else if (obj.componentData.for) {
    d+="<div>loop "+obj.componentData.for+"</div>";  
  } else if (obj.componentData.param!==undefined){
    d+="<div>parameter: "+obj.componentData.name+" = "+obj.componentData.param+"</div>";
  } else if (obj.componentData.type && obj.componentData.type==='var') {
    d+="<div>"+obj.componentData.name+" = "+obj.componentData.value+"</div>";
  } else {
  	for (var key in obj.componentData){
  		d+="<div>"+key+": "+obj.componentData[key]+"</div>";
  	}
  }
	return d;
}

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