module.exports = {
input: function() {
var object = {
  name: 'andy'
}
object.name = 'luke';
},
output: function() {
var object = { name: 'andy' }.___obj();
___Program.set('object', object);
object.name = 'luke';
___Program.setObjectProperty('object[name]', object);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "value": "andy"
  },
  {
   "id": 1,
   "snapshot": "{\"name\":\"andy\"}"
  },
  {
   "id": 3,
   "value": "luke"
  },
  {
   "id": 1,
   "snapshot": "{\"name\":\"luke\"}"
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
   "createdAt": 1,
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