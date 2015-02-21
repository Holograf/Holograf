module.exports = {
input: function() {
var counter = 0;
while (counter < 3) {
  counter++;
}
},
output: function() {
var counter = 0;
___Program.set('counter', counter);
___Program.loop('while', 'open');
while (counter < 3) {
    ___Program.loop('while', 'cycle');
    counter++;
    ___Program.set('counter', counter);
}
___Program.loop('while', 'close');
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 0
  },
  {
   "id": 2,
   "while": "open"
  },
  {
   "id": 2,
   "while": "cycle"
  },
  {
   "id": 1,
   "value": 1
  },
  {
   "id": 2,
   "while": "cycle"
  },
  {
   "id": 1,
   "value": 2
  },
  {
   "id": 2,
   "while": "cycle"
  },
  {
   "id": 1,
   "value": 3
  },
  {
   "id": 2,
   "while": "close"
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
   "type": "block",
   "name": "while",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  }
 ],
 "scopes": {
  "0": {
   "counter": 1
  }
 }
}
}