module.exports = {
input: function() {
var x = 15;
if (x > 5) {
  var size = 'large';
  if (x > 10) {
    size = 'extra' + size;
  }
} else {
  var size = 'small';
}
},
output: function() {
var x = 15;
___Program.set('x', x);
___Program.block('if', 2);
if (x > 5) {
    ___Program.enter('if', 0);
    var size = 'large';
    ___Program.set('size', size);
    ___Program.block('if', 1);
    if (x > 10) {
        ___Program.enter('if', 0);
        size = 'extra' + size;
        ___Program.set('size', size);
    }
    ___Program.block('if', 'close');
} else {
    ___Program.enter('if', 1);
    var size = 'small';
    ___Program.set('size', size);
}
___Program.block('if', 'close');
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": 15
  },
  {
   "id": 2,
   "if": 2
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
   "id": 4,
   "if": 1
  },
  {
   "id": 4,
   "enter": 0
  },
  {
   "id": 3,
   "value": "extralarge"
  },
  {
   "id": 4,
   "if": "close"
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
  },
  {
   "id": 4,
   "type": "block",
   "name": "if",
   "block": 2,
   "scope": 0,
   "createdAt": 4,
   "paths": 1
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