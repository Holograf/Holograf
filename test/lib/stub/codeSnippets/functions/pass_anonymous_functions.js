module.exports = {
input: function() {
var outer = function(fn) {
  return fn(3);
}
var y = outer(function(n) { return n + 1; })
},
output: function() {
var outer = function (fn) {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId, 1);
    ___Program.param('fn', fn, 1);
    ___Program.returnState = fn(3);
    ___Program.return(___functionId, 2);
    return ___Program.returnState;
    ___Program.return(___functionId, 3);
}.___fn();
___Program.set('outer', outer, 1);
var y = outer(function (n) {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId, 4);
    ___Program.param('n', n, 4);
    ___Program.returnState = n + 1;
    ___Program.return(___functionId, 4);
    return ___Program.returnState;
    ___Program.return(___functionId, 4);
}.___fn());
___Program.set('y', y, 4);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 4,
   "invoke": 1
  },
  {
   "id": 5,
   "pointer": 3
  },
  {
   "id": 6,
   "invoke": 3
  },
  {
   "id": 7,
   "value": 3
  },
  {
   "id": 6,
   "return": {
    "value": 4
   }
  },
  {
   "id": 4,
   "return": {
    "value": 4
   }
  },
  {
   "id": 8,
   "value": 4
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
   "name": "outer",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "function",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  },
  {
   "id": 4,
   "type": "invoke",
   "name": "outer",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 5,
   "type": "param",
   "name": "fn",
   "block": 0,
   "scope": 4,
   "createdAt": 2
  },
  {
   "id": 6,
   "type": "invoke",
   "name": "fn",
   "block": 0,
   "scope": 4,
   "createdAt": 3,
   "function": 3
  },
  {
   "id": 7,
   "type": "param",
   "name": "n",
   "block": 0,
   "scope": 6,
   "createdAt": 4
  },
  {
   "id": 8,
   "type": "var",
   "name": "y",
   "scope": 0,
   "createdAt": 7
  }
 ],
 "scopes": {
  "0": {
   "outer": 2,
   "y": 8
  },
  "4": {
   "fn": 5
  },
  "6": {
   "n": 7
  }
 }
}
}