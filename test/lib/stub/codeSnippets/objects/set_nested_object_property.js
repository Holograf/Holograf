module.exports = {
input: function() {
var object = {
  stuff: {}
}
object.stuff.name = 'andy';
},
output: function() {
var object = { stuff: {}.___obj() }.___obj();
___Program.set('object', object);
object.stuff.name = 'andy';
___Program.setObjectProperty('object[stuff][name]', object['stuff']);
},
data: {
 "programSteps": [
  {
   "id": 3,
   "pointer": 2
  },
  {
   "id": 4,
   "pointer": 1
  },
  {
   "id": 1,
   "snapshot": "{}"
  },
  {
   "id": 2,
   "snapshot": "{\"stuff\":{}}"
  },
  {
   "id": 5,
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "var",
   "name": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 4,
   "type": "property",
   "name": "stuff",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 2
  },
  {
   "id": 5,
   "type": "property",
   "name": "name",
   "block": 0,
   "scope": 0,
   "createdAt": 4,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "object": 3,
   "object[stuff]": 4,
   "object[stuff][name]": 5
  }
 }
}
}