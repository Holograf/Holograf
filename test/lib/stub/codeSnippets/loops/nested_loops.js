module.exports = {
input: function() {
var counter = 0;
for (var i = 0; i < 2; i++) {
  for (var j = 0; j < 2; j++) {
    counter++;
  }
}
},
output: function() {
var counter = 0;
___Program.set('counter', counter, 1);
___Program.set('i', 0, 2);
___Program.loop('for', 'open', 2);
for (var i = 0; i < 2; i++) {
    ___Program.loop('for', 'cycle', 2);
    ___Program.set('i', i, 2);
    ___Program.set('j', 0, 3);
    ___Program.loop('for', 'open', 3);
    for (var j = 0; j < 2; j++) {
        ___Program.loop('for', 'cycle', 3);
        ___Program.set('j', j, 3);
        counter++;
        ___Program.set('counter', counter, 4);
    }
    ___Program.loop('for', 'close', 5);
    ___Program.set('j', j, 5);
}
___Program.loop('for', 'close', 6);
___Program.set('i', i, 6);
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
   "id": 4,
   "value": 0
  },
  {
   "id": 5,
   "for": "open"
  },
  {
   "id": 5,
   "for": "cycle"
  },
  {
   "id": 4,
   "value": 0
  },
  {
   "id": 1,
   "value": 1
  },
  {
   "id": 5,
   "for": "cycle"
  },
  {
   "id": 4,
   "value": 1
  },
  {
   "id": 1,
   "value": 2
  },
  {
   "id": 5,
   "for": "close"
  },
  {
   "id": 4,
   "value": 2
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
   "id": 4,
   "value": 0
  },
  {
   "id": 6,
   "for": "open"
  },
  {
   "id": 6,
   "for": "cycle"
  },
  {
   "id": 4,
   "value": 0
  },
  {
   "id": 1,
   "value": 3
  },
  {
   "id": 6,
   "for": "cycle"
  },
  {
   "id": 4,
   "value": 1
  },
  {
   "id": 1,
   "value": 4
  },
  {
   "id": 6,
   "for": "close"
  },
  {
   "id": 4,
   "value": 2
  },
  {
   "id": 3,
   "for": "close"
  },
  {
   "id": 2,
   "value": 2
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
  },
  {
   "id": 4,
   "type": "var",
   "name": "j",
   "block": 3,
   "scope": 0,
   "createdAt": 5
  },
  {
   "id": 5,
   "type": "block",
   "name": "for",
   "block": 3,
   "scope": 0,
   "createdAt": 6
  },
  {
   "id": 6,
   "type": "block",
   "name": "for",
   "block": 3,
   "scope": 0,
   "createdAt": 18
  }
 ],
 "scopes": {
  "0": {
   "counter": 1,
   "i": 2,
   "j": 4
  }
 }
}
}