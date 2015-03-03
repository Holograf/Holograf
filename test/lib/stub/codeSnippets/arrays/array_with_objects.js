module.exports = {
input: function() {
var x = [1,2,{name: 'andy'}];
},
output: function() {
var x = [
    1,
    2,
    { name: 'andy' }.___obj()
].___obj();
___Program.set('x', x, 1);
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
   "value": "andy"
  },
  {
   "id": 1,
   "snapshot": "{\"name\":\"andy\"}"
  },
  {
   "id": 2,
   "length": 3,
   "snapshot": "[1,2,{\"name\":\"andy\"}]"
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
   "type": "property",
   "name": "name",
   "block": 0,
   "scope": 0,
   "createdAt": 4,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "x": 3,
   "x[0]": 4,
   "x[1]": 5,
   "x[2]": 6,
   "x[2][name]": 7
  }
 }
}
}