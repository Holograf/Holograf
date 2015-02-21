module.exports = {
input: function() {
var object = {
  stuff: {
    name: 'andy',
    quest: 'to test'
  }
};
},
output: function() {
var object = {
    stuff: {
        name: 'andy',
        quest: 'to test'
    }
};
___Program.object('object', object);
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
  },
  {
   "id": 6,
   "value": "to test"
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
  },
  {
   "id": 6,
   "type": "property",
   "name": "quest",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "parent": 3
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object.stuff": 4,
   "object.stuff.name": 5,
   "object.stuff.quest": 6
  }
 }
}
}