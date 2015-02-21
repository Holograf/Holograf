module.exports = {
input: function() {
var f = function (x, y, z) {
  x = y + z;
}
f(1, 2, 3);
},
output: function() {
var f = function (x, y, z) {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId);
    ___Program.param('x', x);
    ___Program.param('y', y);
    ___Program.param('z', z);
    x = y + z;
    ___Program.set('x', x);
    ___Program.return(___functionId);
}.___fn();
___Program.set('f', f);
f(1, 2, 3);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "invoke": 1
  },
  {
   "id": 4,
   "value": 1
  },
  {
   "id": 5,
   "value": 2
  },
  {
   "id": 6,
   "value": 3
  },
  {
   "id": 4,
   "value": 5
  },
  {
   "id": 3,
   "return": {
    "value": "___undefined"
   }
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
   "type": "function",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "var",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 4,
   "type": "param",
   "name": "x",
   "block": 0,
   "scope": 3,
   "createdAt": 2
  },
  {
   "id": 5,
   "type": "param",
   "name": "y",
   "block": 0,
   "scope": 3,
   "createdAt": 3
  },
  {
   "id": 6,
   "type": "param",
   "name": "z",
   "block": 0,
   "scope": 3,
   "createdAt": 4
  }
 ],
 "scopes": {
  "0": {
   "f": 2
  },
  "3": {
   "x": 4,
   "y": 5,
   "z": 6
  }
 }
}
}