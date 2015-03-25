module.exports = {
input: function() {
var obj = {};
var next = {prop: obj};
},
output: function() {
var obj = {}.___obj();
___Program.set('obj', obj, 2);
var next = { prop: obj }.___obj();
___Program.set('next', next, 6);
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
   "id": 5,
   "pointer": 1
  },
  {
   "id": 1,
   "snapshot": "{}"
  },
  {
   "id": 3,
   "snapshot": "{\"prop\":{}}"
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  },
  {
   "id": 4,
   "type": "var",
   "name": "next",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  },
  {
   "id": 5,
   "type": "property",
   "name": "prop",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "parent": 3
  }
 ],
 "scopes": {
  "0": {
   "obj": 2,
   "next": 4,
   "next[prop]": 5
  }
 }
}
}