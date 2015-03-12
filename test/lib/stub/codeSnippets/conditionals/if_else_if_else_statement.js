module.exports = {
input: function() {
var x = 4;
if (x > 5) {
  var size = 'large';
} else if (size > 3) {
  var size = 'medium';
} else {
  var size = 'small';
}
},
output: function() {
var x = 4;
___Program.set('x', x, 2);
___Program.block('if', 3, 5);
if (x > 5) {
    ___Program.enter('if', 0, 9);
    var size = 'large';
    ___Program.set('size', size, 11);
} else if (size > 3) {
    ___Program.enter('if', 1, 18);
    var size = 'medium';
    ___Program.set('size', size, 20);
} else {
    ___Program.enter('if', 2, 23);
    var size = 'small';
    ___Program.set('size', size, 25);
}
___Program.block('if', 'close', 5);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 4
  },
  {
   "id": 2,
   "if": 3
  },
  {
   "id": 2,
   "enter": 2
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
   "paths": 3
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