var ProgramDetail = {
  buildState: function(index) {
    if (index >= this.ProgramState.length - 1) {
      index = 0;    // or could set to this.ProgramState.length-1
    }
    // create object to hold the curren state
    var currentState = {};
    // console.log(this.ProgramState);
    for (var i = 0; i <= index; i++) {
      // var for looping through objects in array
      var indexObj = this.ProgramState[i];

      currentState[indexObj.id] = {
        "id": indexObj.id,
        "val": indexObj.val  //,
      }
    }
    return currentState;
  },
  "ProgramState": [
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

console.log(ProgramDetail.buildState(4));




// CUT   ----   MAYBE add name if you haven't seen this object yet
// if (!currentState[this.ProgramState[i]]) {
//   // get the name from Components object as well
//   var found = false;
//   var componentIndex = 0;
//   while (!found) {
//     // compare ids
//     // if (this.Components[componentIndex].id) {
//       if (this.Components[componentIndex].id === i) {
//         // grab the name to plug into the currentState object
//         var name = this.Components[componentIndex].name;
//         found = true;
//       }
//     }
//     componentIndex++;
//   }
// }

