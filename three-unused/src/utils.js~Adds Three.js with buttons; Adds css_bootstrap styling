utils={};



utils.mockData=function(x){
  if (x===undefined){var x=1;}
  
  var r=[];
  var time=_.random(1,1000);
  for (var i=0;i<x;i++){
    time+=_.random(10,200);
    var mock={};
    mock.time=time;
    mock.shape=_.sample(["function","loop"]);
    mock.duration=_.random(10,200);
    r.push(mock);
  }
  return r;
};


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