module.exports = {
input: function() {
var f = function () {};
},
output: function() {
var f = function () {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId);
    ___Program.return(___functionId, 4);
}.___fn();
___Program.set('f', f, 2);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
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
  }
 ],
 "scopes": {
  "0": {
   "f": 2
  }
 }
}
}