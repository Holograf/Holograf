module.exports = {
input: function() {
var x = [1,2,3];
var y = x.splice(1,2);
},
output: function() {
var x = [
    1,
    2,
    3
].___obj();
___Program.set('x', x);
var y = x.splice(1, 2);
___Program.set('y', y);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "value": 1
  },
  {
   "id": 4,
   "value": 2
  },
  {
   "id": 5,
   "value": 3
  },
  {
   "id": 1,
   "length": 3,
   "snapshot": "[1,2,3]"
  },
  {
   "id": 3,
   "value": 1
  },
  {
   "id": 1,
   "length": 1,
   "snapshot": "[1]"
  },
  {
   "id": 7,
   "pointer": 6
  },
  {
   "id": 8,
   "value": 2
  },
  {
   "id": 9,
   "value": 3
  },
  {
   "id": 6,
   "length": 2,
   "snapshot": "[2,3]"
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
   "type": "var",
   "name": "x",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "element",
   "name": "0",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 4,
   "type": "element",
   "name": "1",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 1
  },
  {
   "id": 5,
   "type": "element",
   "name": "2",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "parent": 1
  },
  {
   "id": 6,
   "type": "array",
   "block": 0,
   "scope": 0,
   "createdAt": 7
  },
  {
   "id": 7,
   "type": "var",
   "name": "y",
   "block": 0,
   "scope": 0,
   "createdAt": 7
  },
  {
   "id": 8,
   "type": "element",
   "name": "0",
   "block": 0,
   "scope": 0,
   "createdAt": 8,
   "parent": 6
  },
  {
   "id": 9,
   "type": "element",
   "name": "1",
   "block": 0,
   "scope": 0,
   "createdAt": 9,
   "parent": 6
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "x[0]": 3,
   "x[1]": 4,
   "x[2]": 5,
   "y": 7,
   "y[0]": 8,
   "y[1]": 9
  }
 }
}
}