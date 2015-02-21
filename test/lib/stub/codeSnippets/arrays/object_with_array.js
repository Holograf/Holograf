module.exports = {
input: function() {
var x = {inner: [1,2,3]};
},
output: function() {
var x = {
    inner: [
        1,
        2,
        3
    ].___obj()
}.___obj();
___Program.set('x', x);
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
   "id": 5,
   "value": 1
  },
  {
   "id": 6,
   "value": 2
  },
  {
   "id": 7,
   "value": 3
  },
  {
   "id": 1,
   "length": 3,
   "snapshot": "[1,2,3]"
  },
  {
   "id": 2,
   "snapshot": "{\"inner\":[1,2,3]}"
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
   "type": "array",
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
   "name": "x",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 4,
   "type": "property",
   "name": "inner",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 2
  },
  {
   "id": 5,
   "type": "element",
   "name": "0",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 1
  },
  {
   "id": 6,
   "type": "element",
   "name": "1",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "parent": 1
  },
  {
   "id": 7,
   "type": "element",
   "name": "2",
   "block": 0,
   "scope": 0,
   "createdAt": 4,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "x": 3,
   "x[inner]": 4,
   "x[inner][0]": 5,
   "x[inner][1]": 6,
   "x[inner][2]": 7
  }
 }
}
}