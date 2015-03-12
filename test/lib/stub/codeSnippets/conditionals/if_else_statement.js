module.exports = {
input: function() {
var x = 1;
if (x > 5) {
  var size = 'large';
} else {
  var size = 'small';
}
},
output: function() {
var x = 1;
___Program.set('x', x, 2);
___Program.block('if', 2, 5);
if (x > 5) {
    ___Program.enter('if', 0, 9);
    var size = 'large';
    ___Program.set('size', size, 11);
} else {
    ___Program.enter('if', 1, 14);
    var size = 'small';
    ___Program.set('size', size, 16);
}
___Program.block('if', 'close', 5);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 1
  },
  {
   "id": 2,
   "if": 2
  },
  {
   "id": 2,
   "enter": 1
  },
  {
   "id": 3,
   "value": "small"
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
   "paths": 2
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