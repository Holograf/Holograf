module.exports = {
input: function() {
var x = {stats: {height: 'tall'}};
var y = x.stats;
},
output: function() {
var x = { stats: { height: 'tall' }.___obj() }.___obj();
___Program.set('x', x, 2);
var y = x.stats;
___Program.set('y', y, 12);
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
   "value": "tall"
  },
  {
   "id": 6,
   "pointer": 3
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
   "createdAt": 1
  },
  {
   "id": 4,
   "type": "property",
   "name": "stats",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 5,
   "type": "property",
   "name": "height",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 3
  },
  {
   "id": 6,
   "type": "var",
   "name": "y",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "x.stats": 4,
   "x.stats.height": 5,
   "y": 6
  }
 }
}
}