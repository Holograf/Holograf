module.exports = {
input: function() {
var counter = 0;
for (var i = 0; i < 3; i++) {
  counter += i;
}
},
output: function() {
var counter = 0;
___Program.set('counter', counter, 1);
___Program.set('i', 0, 2);
___Program.loop('for', 'open', 2);
for (var i = 0; i < 3; i++) {
    ___Program.loop('for', 'cycle', 2);
    ___Program.set('i', i, 2);
    counter += i;
    ___Program.set('counter', counter, 3);
}
___Program.loop('for', 'close', 4);
___Program.set('i', i, 4);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 0
  },
  {
   "id": 2,
   "value": 0
  },
  {
   "id": 3,
   "for": "open"
  },
  {
   "id": 3,
   "for": "cycle"
  },
  {
   "id": 2,
   "value": 0
  },
  {
   "id": 1,
   "value": 0
  },
  {
   "id": 3,
   "for": "cycle"
  },
  {
   "id": 2,
   "value": 1
  },
  {
   "id": 1,
   "value": 1
  },
  {
   "id": 3,
   "for": "cycle"
  },
  {
   "id": 2,
   "value": 2
  },
  {
   "id": 1,
   "value": 3
  },
  {
   "id": 3,
   "for": "close"
  },
  {
   "id": 2,
   "value": 3
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
   "type": "var",
   "name": "counter",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "var",
   "name": "i",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  },
  {
   "id": 3,
   "type": "block",
   "name": "for",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  }
 ],
 "scopes": {
  "0": {
   "counter": 1,
   "i": 2
  }
 }
}
}