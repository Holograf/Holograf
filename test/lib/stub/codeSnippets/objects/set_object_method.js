module.exports = {
input: function() {
var object = {};
object.f = function () {
  return 1;
}
},
output: function() {
var object = {}.___obj();
___Program.set('object', object, 1);
object.f = function () {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId, 2);
    ___Program.returnState = 1;
    ___Program.return(___functionId, 3);
    return ___Program.returnState;
    ___Program.return(___functionId, 4);
}.___fn();
___Program.setObjectProperty('object[f]', object, 2);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 1,
   "snapshot": "{}"
  },
  {
   "id": 4,
   "pointer": 3
  },
  {
   "id": 1,
   "snapshot": "{}"
  }
 ],
 "components": [
  {
   "id": 0,
   "type": "block",
   "name": "global",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 1,
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "var",
   "name": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "function",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  },
  {
   "id": 4,
   "type": "method",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object[f]": 4
  }
 }
}
}