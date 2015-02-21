module.exports = {
input: function() {
var obj = {};
var next = {prop: obj};
},
output: function() {
var obj = {};
___Program.object('obj', obj, '{}');
var next = { prop: obj };
___Program.object('next', next, '{"prop":"obj"}');
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
   "pointer": 1
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
   "createdAt": 1
  },
  {
   "id": 4,
   "type": "var",
   "name": "next",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  },
  {
   "id": 5,
   "type": "property",
   "name": "prop",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
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