module.exports = {
input: function() {
var f = function (n) {
  n++;
}
f(3);
},
output: function() {
var f = function (n) {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId, 1);
    ___Program.param('n', n, 1);
    n++;
    ___Program.set('n', n, 2);
    ___Program.return(___functionId, 3);
}.___fn();
___Program.set('f', f, 1);
f(3);
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
   "id": 4,
   "value": 4
  },
  {
   "id": 3,
   "return": {
    "value": "___undefined"
   }
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
   "name": "n",
   "block": 0,
   "scope": 3,
   "createdAt": 2
  }
 ],
 "scopes": {
  "0": {
   "f": 2
  },
  "3": {
   "n": 4
  }
 }
}
}