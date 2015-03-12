module.exports = {
input: function() {
var f = function () {
  return 1;
};
var result = f();
},
output: function() {
var f = function () {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId);
    ___Program.returnState = 1;
    ___Program.return(___functionId, 5);
    return ___Program.returnState;
    ___Program.return(___functionId, 4);
}.___fn();
___Program.set('f', f, 2);
___Program.setInvocationPoint(10);
var result = f();
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
   "id": 3,
   "return": {
    "value": 1
   }
  },
  {
   "id": 4,
   "value": 1
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
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  }
 ],
 "scopes": {
  "0": {
   "f": 2,
   "result": 4
  },
  "3": {}
 }
}
}