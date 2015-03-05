module.exports = {
input: function() {
var object = {
  speak: function () {
    return 'woof!';
  }
};
var result = object.speak();
},
output: function() {
var object = {
    speak: function () {
        var ___functionId = arguments.callee.___id;
        ___Program.method(___functionId, 2);
        ___Program.returnState = 'woof!';
        ___Program.return(___functionId, 3);
        return ___Program.returnState;
        ___Program.return(___functionId, 4);
    }.___fn()
}.___obj();
___Program.set('object', object, 1);
var result = object.speak();
___Program.set('result', result, 6);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "value": "___function code"
  },
  {
   "id": 4,
   "invoke": "object[speak]"
  },
  {
   "id": 4,
   "return": "woof!"
  },
  {
   "id": 5,
   "value": "woof!"
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
   "type": "method",
   "name": "speak",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 4,
   "type": "invoke",
   "name": "object[speak]",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "function": 3
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
   "object": 2,
   "object[speak]": 3,
   "result": 5
  },
  "4": {}
 }
}
}