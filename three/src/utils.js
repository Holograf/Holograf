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
  for (var i=0, glossary={};i<x.length;glossary[x[i].id]=x[i], i++){}
  return glossary;
};

utils.parseTimeline=function(timeline,components){
  var glossary= utils.toGlossary(components);
	for (var i=0;i<timeline.length;i++){
		timeline[i].component=glossary[timeline[i].id];
	}
	return timeline;
};