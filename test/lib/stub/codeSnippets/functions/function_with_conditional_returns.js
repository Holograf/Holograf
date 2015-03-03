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
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId, 1);
    ___Program.param('x', x, 1);
    ___Program.block('if', 2, 2);
    if (x > 10) {
        ___Program.enter('if', 0, 2);
        ___Program.returnState = 'large';
        ___Program.return(___functionId, 3);
        return ___Program.returnState;
    } else {
        ___Program.enter('if', 1, 4);
        ___Program.returnState = 'small';
        ___Program.return(___functionId, 5);
        return ___Program.returnState;
    }
    ___Program.block('if', 'close', 6);
    ___Program.return(___functionId, 7);
}.___fn();
___Program.set('f', f, 1);
var result = f(12);
___Program.set('result', result, 8);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "invoke": 1
  },
  {
   "id": 4,
   "value": 12
  },
  {
   "id": 5,
   "if": 2
  },
  {
   "id": 5,
   "enter": 0
  },
  {
   "id": 3,
   "return": {
    "value": "large"
   }
  },
  {
   "id": 6,
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
   "type": "function",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "var",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 4,
   "type": "param",
   "name": "x",
   "block": 0,
   "scope": 3,
   "createdAt": 2
  },
  {
   "id": 5,
   "type": "block",
   "name": "if",
   "block": 0,
   "scope": 3,
   "createdAt": 3,
   "paths": 2
  },
  {
   "id": 6,
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 6
  }
 ],
 "scopes": {
  "0": {
   "f": 2,
   "result": 6
  },
  "3": {
   "x": 4
  }
 }
}
}