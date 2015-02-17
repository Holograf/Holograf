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


utils.toGlossary=function(data){
  // data is an array of objects; turn it into a hash where id element from each object is it's key
  for (var i=0;i < data.length; i++){
    var glossary={};
    glossary[data[i].id] = data[i];
  }
  return glossary;
};

utils.buildTimeline = function(data) {
  // check format of data object
  if (!data.ProgramSteps || !data.Components) {
    console.log('invalid data format');
    return null;
  }
  // var timeline=utils.mockData(30);   // what did this do?
  timeline=data.programSteps;
  // add components to steps
  var glossary=utils.toGlossary(data.components);
  for (var i = 0; i < timeline.length; i++) {
    timeline[i].component = glossary[timeline[i].id];  
  }
  // console.log('timeline built:',timeline);
  return timeline;
};

// deprecated. probably not working at this point
utils.buildStep = function(index, data) {
  // check format of data object
  if (!data.ProgramSteps || !data.Components) {
    console.log('invalid data format');
    return null;
  }
  // Create objects that have been instantiated so far
  if (index >= data.ProgramSteps.length) {
    index = 0;    // or could set to this.ProgramSteps.length-1
  }
  // create object to hold the current step
  var currentStep = {"index": index};
  // add all the id's that exist up through this step
  for (var i = 0; i <= index; i++) {
    // var for looping through objects in array
    var stepObj = data.ProgramSteps[i];
    // Add the other Components info for each item
    var foundComponent = false;
    var idx = 0;
      // could optimize this by using a while loop with a found boolean
    while (!foundComponent) {
      var componentIndexObj = data.Components[j]

    }
      // match the Step item's id with the Components id
      if (componentIndexObj.id === stepObj.id) {
        currentStep[stepObj.id] = {
          "id": stepObj.id,
          "val": stepObj.val,
          "type": componentIndexObj.type,
          "name": componentIndexObj.name,
          "scope": componentIndexObj.scope,
          "container": componentIndexObj.container,
          "createdAt": componentIndexObj.createdAt
        }
      }
    }
  }
  return currentStep;
};

Program.prototype.nextStep = function() {
  if (this._currentStep.index >= this.ProgramSteps.length - 1) {
    this.buildStep(0);
  } else {
    this.buildStep(this._currentStep.index + 1);
  }
  return this._currentStep;
}

Program.prototype.previousStep = function() {
  if (this._currentStep.index <= 0) {
    this.buildStep(this.ProgramSteps.length-1);
  } else {
    this.buildStep(this._currentStep.index - 1);
  }
  return this._currentStep;
}

