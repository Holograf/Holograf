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

utils.tweenify=function(obj,opts){
  //tweenify is a decorator
  if (obj===undefined){var obj={};}
  if (opts===undefined){var opts={};}
  if (opts.z1===undefined){opts.z1=0;}
  if (opts.z2===undefined){opts.z2=0;}
  console.log(opts);
  obj.collapse=new TWEEN.Tween(obj.position).to({z:opts.z1},1500).easing(TWEEN.Easing.Quadratic.InOut);
  obj.expand=new TWEEN.Tween(obj.position).to({z:opts.z2},1500).easing(TWEEN.Easing.Quadratic.InOut);
  return obj;
};