module.exports = {
input: function() {
var x = {};
x.a = {};
},
output: function() {
var x = {};
___Program.object('x', x, '{}');
x.a = {};
___Program.object('x[a]', x['a'], '{}');
___Program.setObjectProperty('x[a]', x);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 4,
   "pointer": 3
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
   "name": "x",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  },
  {
   "id": 4,
   "type": "property",
   "name": "a",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "x[a]": 4
  }
 }
}
}