module.exports = {
input: function() {
var x = 1;
++x;
},
output: function() {
var x = 1;
___Program.set('x', x);
++x;
___Program.set('x', x);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 1
  },
  {
   "id": 1,
   "value": 2
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
   "name": "x",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  }
 ],
 "scopes": {
  "0": {
   "x": 1
  }
 }
}
}