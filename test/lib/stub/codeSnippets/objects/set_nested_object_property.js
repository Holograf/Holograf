module.exports = {
input: function() {
var object = {
  stuff: {}
}
object.stuff.name = 'andy';
},
output: function() {
var object = { stuff: {} };
___Program.object('object', object);
object.stuff.name = 'andy';
___Program.setObjectProperty('object.stuff.name', object.stuff.name);
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
  },
  {
   "id": 5,
   "value": "andy"
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  },
  {
   "id": 4,
   "type": "property",
   "name": "stuff",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 5,
   "type": "property",
   "name": "name",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 3
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object.stuff": 4,
   "object.stuff.name": 5
  }
 }
}
}