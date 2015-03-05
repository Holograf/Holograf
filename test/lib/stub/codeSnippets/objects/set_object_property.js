module.exports = {
input: function() {
var object = {};
object.name = 'andy';
},
output: function() {
var object = {}.___obj();
___Program.set('object', object, 1);
object.name = 'andy';
___Program.setObjectProperty('object[name]', object, 'name', 2);
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
   "value": "andy"
  },
  {
   "id": 1,
   "snapshot": "{\"name\":\"andy\"}"
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
   "type": "property",
   "name": "name",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object[name]": 3
  }
 }
}
}