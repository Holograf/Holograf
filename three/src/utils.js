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