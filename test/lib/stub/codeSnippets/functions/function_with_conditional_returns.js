module.exports = {
input: function() {
var f = function (x) {
  if (x > 10) {
    return 'large';
  } else {
    return 'small';
  }
}
var result = f(12);
},
output: function() {
var f = function (x) {
    ___Program.invoke('f');
    ___Program.param('x', x);
    ___Program.block('if', 2);
    if (x > 10) {
        ___Program.enter('if', 0);
        ___Program.returnState = 'large';
        ___Program.return('f');
        return ___Program.returnState;
    } else {
        ___Program.enter('if', 1);
        ___Program.returnState = 'small';
        ___Program.return('f');
        return ___Program.returnState;
    }
    ___Program.block('if', 'close');
    ___Program.return('f');
};
___Program.function('f', f);
var result = f(12);
___Program.set('result', result);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": "___function code"
  },
  {
   "id": 2,
   "invoke": "f"
  },
  {
   "id": 3,
   "param": 12
  },
  {
   "id": 4,
   "if": 2
  },
  {
   "id": 4,
   "enter": 0
  },
  {
   "id": 2,
   "return": "large"
  },
  {
   "id": 5,
   "value": "large"
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
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 3,
   "type": "var",
   "name": "x",
   "block": 0,
   "scope": 2,
   "createdAt": 2
  },
  {
   "id": 4,
   "type": "block",
   "name": "if",
   "block": 0,
   "scope": 2,
   "createdAt": 3,
   "paths": 2
  },
  {
   "id": 5,
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 6
  }
 ],
 "scopes": {
  "0": {
   "f": 1,
   "result": 5
  },
  "2": {
   "x": 3
  }
 }
}
}