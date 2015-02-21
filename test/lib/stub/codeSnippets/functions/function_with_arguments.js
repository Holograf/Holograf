module.exports = {
input: function() {
var f = function (x, y, z) {
  x = y + z;
}
f(1, 2, 3);
},
output: function() {
var f = function (x, y, z) {
    ___Program.invoke('f');
    ___Program.param('x', x);
    ___Program.param('y', y);
    ___Program.param('z', z);
    x = y + z;
    ___Program.set('x', x);
    ___Program.return('f');
};
___Program.function('f', f);
f(1, 2, 3);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": "___function code"
  },
  {
   "id": 2,
   "invoke": "f"
  },
  {
   "id": 3,
   "param": 1
  },
  {
   "id": 4,
   "param": 2
  },
  {
   "id": 5,
   "param": 3
  },
  {
   "id": 3,
   "value": 5
  },
  {
   "id": 2,
   "return": "___undefined"
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
   "type": "var",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 3,
   "type": "var",
   "name": "x",
   "block": 0,
   "scope": 2,
   "createdAt": 2
  },
  {
   "id": 4,
   "type": "var",
   "name": "y",
   "block": 0,
   "scope": 2,
   "createdAt": 3
  },
  {
   "id": 5,
   "type": "var",
   "name": "z",
   "block": 0,
   "scope": 2,
   "createdAt": 4
  }
 ],
 "scopes": {
  "0": {
   "f": 1
  },
  "2": {
   "x": 3,
   "y": 4,
   "z": 5
  }
 }
}
}