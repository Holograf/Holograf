module.exports = {
input: function() {
var counter = 0;
do {
    counter++;
} while (counter < 3) 
},
output: function() {
var counter = 0;
___Program.set('counter', counter);
___Program.loop('do', 'open');
do {
    ___Program.loop('do', 'cycle');
    counter++;
    ___Program.set('counter', counter);
} while (counter < 3);
___Program.loop('do', 'close');
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 0
  },
  {
   "id": 2,
   "do": "open"
  },
  {
   "id": 2,
   "do": "cycle"
  },
  {
   "id": 1,
   "value": 1
  },
  {
   "id": 2,
   "do": "cycle"
  },
  {
   "id": 1,
   "value": 2
  },
  {
   "id": 2,
   "do": "cycle"
  },
  {
   "id": 1,
   "value": 3
  },
  {
   "id": 2,
   "do": "close"
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
   "name": "do",
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