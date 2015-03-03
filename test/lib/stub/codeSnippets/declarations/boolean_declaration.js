module.exports = {
input: function() {
var x = true;
},
output: function() {
var x = true;
___Program.set('x', x, 1);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": true
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