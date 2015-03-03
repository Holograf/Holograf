module.exports = {
input: function() {
var y = [1,2,3];
y[0] = 'new';
},
output: function() {
var y = [
    1,
    2,
    3
].___obj();
___Program.set('y', y, 1);
y[0] = 'new';
___Program.setObjectProperty('y[0]', y, 2);
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
   "value": "new"
  },
  {
   "id": 1,
   "length": 3,
   "snapshot": "[\"new\",2,3]"
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
   "name": "y",
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
  }
 ],
 "scopes": {
  "0": {
   "y": 2,
   "y[0]": 3,
   "y[1]": 4,
   "y[2]": 5
  }
 }
}
}