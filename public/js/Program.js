var ProgramObject = {

  _currentState: null,
  set: function(attr, value) {},
  get: function(attr) {
    // var value = 
    // return value;
  },

  // this method should/could run the code and create all of components that will exist
  buildFullInitialState: function() {},

  // This method only gives you the most up-to-date values from within ProgramSteps array
  updateState: function(index) {
    if (index >= this.ProgramSteps.length) {
      index = 0;    // or could set to this.ProgramSteps.length-1
    }
    // create object to hold the curren state
    var currentState = {
      "index": index
    };
    for (var i = 0; i <= index; i++) {
      // var for looping through objects in array
      var stepObj = this.ProgramSteps[i];

      currentState[stepObj.id] = {
        "id": stepObj.id,
        "val": stepObj.val  //,
      }
    }
    this._currentState = currentState;
    return this._currentState;
  },

  // This method is a hybrid of the prior two:
    // It provides the ProgramSteps values with all their info from Components array
  buildStep: function(index) {
    
    // Create objects that have been instantiated so far
    if (index >= this.ProgramSteps.length) {
      index = 0;    // or could set to this.ProgramSteps.length-1
    }
    // create object to hold the curren state
    var currentState = {
      "index": index
    };

    // add all the id's that exist up through this step
    for (var i = 0; i <= index; i++) {
      // var for looping through objects in array
      var stepObj = this.ProgramSteps[i];

      // Add the other Components info for each item
        // could optimize this by using a while loop with a found boolean
      for (var j = 0; j < this.Components.length; j++) {
        var componentIndexObj = this.Components[j]
        // match the Step item's id with the Components id
        if (componentIndexObj.id === stepObj.id) {
          currentState[stepObj.id] = {
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


    this._currentState = currentState;
    return this._currentState;
  },

  nextState: function() {
    if (this._currentState.index >= this.ProgramSteps.length - 1) {
      this.buildState(0);
    } else {
      this.buildState(this._currentState.index + 1);
    }
    return this._currentState;
  },

  previousState: function() {
    if (this._currentState.index <= 0) {
      this.buildState(this.ProgramSteps.length-1);
    } else {
      this.buildState(this._currentState.index - 1);
    }
    return this._currentState;
  },


  "ProgramSteps": [
    { "id": 1,
      "val": 0
    },
    { "id": 3,
      "val": 1
    },
    { "id": 1,
      "val": 1
    },
    { "id": 3,
      "val": 2
    },
    { "id": 1,
      "val": 2
    },
    { "id": 3,
      "val": 3
    },
    { "id": 1,
      "val": 3
    }
  ],

  "Components": [
    { "id": 1,
      "type": "number",
      "name": "y",
      "scope": 0,
      "container": 0,
      "createdAt": 0
    },
    { "id": 2,
      "type": "loop",
      "name": "for",
      "scope": 0,
      "container": 0,
      "createdAt": 1
    },
    { "id": 3,
      "type": "number",
      "name": "i",
      "scope": 0,
      "container": 2,
      "createdAt": 2
    }
  ]
};

module.exports = ProgramObject;

// console.log(ProgramObject.buildState(5));
// console.log(ProgramObject._currentState);
// console.log(ProgramObject.nextState());
// console.log(ProgramObject.nextState());
// console.log(ProgramObject.previousState());
// console.log(ProgramObject.previousState());

