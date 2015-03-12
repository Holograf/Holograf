module.exports = {
input: function() {
var obj = {name: 'andy'}
var next = {};
next.o = obj;
},
output: function() {
var obj = { name: 'andy' }.___obj();
___Program.set('obj', obj, 2);
var next = {}.___obj();
___Program.set('next', next, 9);
___Program.parentObject = next;
___Program.objectAccessor = 'o';
___Program.parentObject[___Program.objectAccessor] = obj;
___Program.setObjectProperty(___Program.parentObject, ___Program.objectAccessor, 14);
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
   "id": 5,
   "pointer": 4
  },
  {
   "id": 4,
   "snapshot": "{}"
  },
  {
   "id": 6,
   "pointer": 1
  },
  {
   "id": 4,
   "snapshot": "{\"o\":{\"name\":\"andy\"}}"
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
   "name": "obj",
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
  },
  {
   "id": 4,
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  },
  {
   "id": 5,
   "type": "var",
   "name": "next",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  },
  {
   "id": 6,
   "type": "property",
   "name": "o",
   "block": 0,
   "scope": 0,
   "createdAt": 5,
   "parent": 4
  }
 ],
 "scopes": {
  "0": {
   "obj": 2,
   "obj[name]": 3,
   "next": 5,
   "next[o]": 6
  }
 }
}
}