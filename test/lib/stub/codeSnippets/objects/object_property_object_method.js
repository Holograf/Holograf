module.exports = {
input: function() {
var object = {
  nested: {
  f: function () {
      return true;
    }
  }
};
var result = object.nested.f();
},
output: function() {
var object = {
    nested: {
        f: function () {
            var ___functionId = arguments.callee.___id;
            ___Program.method(___functionId);
            ___Program.returnState = true;
            ___Program.return(___functionId);
            return ___Program.returnState;
            ___Program.return(___functionId);
        }.___fn()
    }.___obj()
}.___obj();
___Program.set('object', object);
var result = object.nested.f();
___Program.set('result', result);
},
data: {
 "programSteps": [
  {
   "id": 4,
   "pointer": 3
  },
  {
   "id": 5,
   "pointer": 2
  },
  {
   "id": 6,
   "pointer": 1
  },
  {
   "id": 2,
   "snapshot": "{}"
  },
  {
   "id": 3,
   "snapshot": "{\"nested\":{}}"
  },
  {
   "id": 7,
   "invoke": 1
  },
  {
   "id": 7,
   "return": {
    "value": true
   }
  },
  {
   "id": 8,
   "value": true
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 4,
   "type": "var",
   "name": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 5,
   "type": "property",
   "name": "nested",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 3
  },
  {
   "id": 6,
   "type": "property",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 2
  },
  {
   "id": 7,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 5,
   "function": 1
  },
  {
   "id": 8,
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 7
  }
 ],
 "scopes": {
  "0": {
   "object": 4,
   "object[nested]": 5,
   "object[nested][f]": 6,
   "result": 8
  },
  "7": {}
 }
}
}