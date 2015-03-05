module.exports = {
input: function() {
var x = 10;
if (x > 5) {
  var size = 'large';
}
},
output: function() {
var x = 10;
___Program.set('x', x, 1);
___Program.block('if', 1, 2);
if (x > 5) {
    ___Program.enter('if', 0, 2);
    var size = 'large';
    ___Program.set('size', size, 3);
}
___Program.block('if', 'close', 4);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 10
  },
  {
   "id": 2,
   "if": 1
  },
  {
   "id": 2,
   "enter": 0
  },
  {
   "id": 3,
   "value": "large"
  },
  {
   "id": 2,
   "if": "close"
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
   "name": "x",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "block",
   "name": "if",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "paths": 1
  },
  {
   "id": 3,
   "type": "var",
   "name": "size",
   "block": 2,
   "scope": 0,
   "createdAt": 3
  }
 ],
 "scopes": {
  "0": {
   "x": 1,
   "size": 3
  }
 }
}
}