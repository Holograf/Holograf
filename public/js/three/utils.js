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
