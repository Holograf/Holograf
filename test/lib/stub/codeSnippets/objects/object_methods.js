module.exports = {
input: function() {
var object = {
  speak: function () {
    return 'woof!';
  }
};
},
output: function() {
var object = {
    speak: function () {
        var ___functionId = arguments.callee.___id;
        ___Program.invoke(___functionId);
        ___Program.returnState = 'woof!';
        ___Program.return(___functionId, 8);
        return ___Program.returnState;
        ___Program.return(___functionId, 7);
    }.___fn()
}.___obj();
___Program.set('object', object, 2);
},
data: {
 "programSteps": [
  {
   "id": 3,
   "pointer": 2
  },
  {
   "id": 4,
   "pointer": 1
  },
  {
   "id": 2,
   "snapshot": "{}"
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
   "type": "var",
   "name": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 4,
   "type": "property",
   "name": "speak",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 2
  }
 ],
 "scopes": {
  "0": {
   "object": 3,
   "object[speak]": 4
  }
 }
}
}