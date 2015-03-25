module.exports = {
input: function() {
var object = {
  a: 'name',
  b: 2
};
},
output: function() {
var object = {
    a: 'name',
    b: 2
}.___obj();
___Program.set('object', object, 2);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "value": "name"
  },
  {
   "id": 4,
   "value": 2
  },
  {
   "id": 1,
   "snapshot": "{\"a\":\"name\",\"b\":2}"
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
   "name": "a",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 4,
   "type": "property",
   "name": "b",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object[a]": 3,
   "object[b]": 4
  }
 }
}
}