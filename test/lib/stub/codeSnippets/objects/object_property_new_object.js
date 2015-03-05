module.exports = {
input: function() {
var x = {};
x.a = {};
},
output: function() {
var x = {}.___obj();
___Program.set('x', x, 1);
x.a = {}.___obj();
___Program.setObjectProperty('x[a]', x, 'a', 2);
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
   "id": 4,
   "pointer": 3
  },
  {
   "id": 1,
   "snapshot": "{\"a\":{}}"
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  },
  {
   "id": 4,
   "type": "property",
   "name": "a",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "x[a]": 4
  }
 }
}
}