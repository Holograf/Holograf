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
            ___Program.method('object[nested][f]');
            ___Program.returnState = true;
            ___Program.return('object[nested][f]');
            return ___Program.returnState;
            ___Program.return('object[nested][f]');
        }
    }
};
___Program.object('object', object, '{"nested":{}}');
var result = object.nested.f();
___Program.set('result', result);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 4,
   "pointer": 3
  },
  {
   "id": 5,
   "value": "___function code"
  },
  {
   "id": 6,
   "invoke": "object[nested][f]"
  },
  {
   "id": 6,
   "return": true
  },
  {
   "id": 7,
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
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 1
  },
  {
   "id": 4,
   "type": "property",
   "name": "nested",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 5,
   "type": "method",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 2,
   "parent": 3
  },
  {
   "id": 6,
   "type": "invoke",
   "name": "object[nested][f]",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "function": 5
  },
  {
   "id": 7,
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
   "object[nested]": 4,
   "object[nested][f]": 5,
   "result": 7
  },
  "6": {}
 }
}
}