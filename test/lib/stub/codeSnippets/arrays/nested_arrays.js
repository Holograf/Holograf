module.exports = {
input: function() {
var x = [1,2,['a','b','c']];
},
output: function() {
var x = [
    1,
    2,
    [
        'a',
        'b',
        'c'
    ].___obj()
].___obj();
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
   "value": 1
  },
  {
   "id": 5,
   "value": 2
  },
  {
   "id": 6,
   "pointer": 1
  },
  {
   "id": 7,
   "value": "a"
  },
  {
   "id": 8,
   "value": "b"
  },
  {
   "id": 9,
   "value": "c"
  },
  {
   "id": 1,
   "length": 3,
   "snapshot": "[\"a\",\"b\",\"c\"]"
  },
  {
   "id": 2,
   "length": 3,
   "snapshot": "[1,2,[\"a\",\"b\",\"c\"]]"
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
   "type": "array",
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
   "type": "element",
   "name": "0",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 2
  },
  {
   "id": 5,
   "type": "element",
   "name": "1",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 2
  },
  {
   "id": 6,
   "type": "element",
   "name": "2",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "parent": 2
  },
  {
   "id": 7,
   "type": "element",
   "name": "0",
   "block": 0,
   "scope": 0,
   "createdAt": 4,
   "parent": 1
  },
  {
   "id": 8,
   "type": "element",
   "name": "1",
   "block": 0,
   "scope": 0,
   "createdAt": 5,
   "parent": 1
  },
  {
   "id": 9,
   "type": "element",
   "name": "2",
   "block": 0,
   "scope": 0,
   "createdAt": 6,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "x": 3,
   "x[0]": 4,
   "x[1]": 5,
   "x[2]": 6,
   "x[2][0]": 7,
   "x[2][1]": 8,
   "x[2][2]": 9
  }
 }
}
}