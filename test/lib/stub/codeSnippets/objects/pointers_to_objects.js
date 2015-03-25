module.exports = {
input: function() {
var x = {};
var y = x;
},
output: function() {
var x = {}.___obj();
___Program.set('x', x, 2);
var y = x;
___Program.set('y', y, 6);
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
   "id": 3,
   "pointer": 1
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
   "type": "var",
   "name": "y",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "y": 3
  }
 }
}
}