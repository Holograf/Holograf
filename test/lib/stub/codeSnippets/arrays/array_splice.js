module.exports = {
input: function() {
var x = [1,2,3];
x.splice(1,0,'new');
},
output: function() {
var x = [
    1,
    2,
    3
].___obj();
___Program.set('x', x);
x.splice(1, 0, 'new');
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
   "id": 4,
   "value": "new"
  },
  {
   "id": 5,
   "value": 2
  },
  {
   "id": 6,
   "value": 3
  },
  {
   "id": 1,
   "length": 4,
   "snapshot": "[1,\"new\",2,3]"
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
   "type": "element",
   "name": 3,
   "block": 0,
   "scope": 0,
   "createdAt": 8,
   "parent": 1
  },
  {
   "id": 7,
   "type": "array",
   "block": 0,
   "scope": 0,
   "createdAt": 10
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "x[0]": 3,
   "x[1]": 4,
   "x[2]": 5,
   "x[3]": 6
  }
 }
}
}