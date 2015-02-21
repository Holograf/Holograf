module.exports = {
input: function() {
var object = {
  f: 'andy'
}
object.f = function () {
  return 1;
};
var result = object.f();
},
output: function() {
var object = { f: 'andy' }.___obj();
___Program.set('object', object);
object.f = function () {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId);
    ___Program.returnState = 1;
    ___Program.return(___functionId);
    return ___Program.returnState;
    ___Program.return(___functionId);
}.___fn();
___Program.setObjectProperty('object[f]', object);
var result = object.f();
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
   "value": "andy"
  },
  {
   "id": 3,
   "value": "___function code"
  },
  {
   "id": 4,
   "invoke": "object.f"
  },
  {
   "id": 4,
   "return": 1
  },
  {
   "id": 5,
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "var",
   "name": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "property",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 4,
   "type": "invoke",
   "name": "object.f",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "function": 3
  },
  {
   "id": 5,
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 5
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object.f": 3,
   "result": 5
  },
  "4": {}
 }
}
}