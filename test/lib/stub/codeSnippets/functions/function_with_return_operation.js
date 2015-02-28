module.exports = {
input: function() {
var f = function (x) {
  return x * 2;
}
var result = f(3);
},
output: function() {
var f = function (x) {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId);
    ___Program.param('x', x);
    ___Program.returnState = x * 2;
    ___Program.return(___functionId);
    return ___Program.returnState;
    ___Program.return(___functionId);
}.___fn();
___Program.set('f', f);
var result = f(3);
___Program.set('result', result);
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
   "value": 3
  },
  {
   "id": 3,
   "return": {
    "value": 6
   }
  },
  {
   "id": 5,
   "value": 6
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
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 4
  }
 ],
 "scopes": {
  "0": {
   "f": 2,
   "result": 5
  },
  "3": {
   "x": 4
  }
 }
}
}