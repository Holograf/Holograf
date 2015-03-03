module.exports = {
input: function() {
var x = {name: 'charlie'};
var f = function (verb) {
  var y = x;
  return 'I want to ' + verb + ' ' + y.name;
}
var result = f('eat');
},
output: function() {
var x = { name: 'charlie' }.___obj();
___Program.set('x', x, 1);
var f = function (verb) {
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId, 2);
    ___Program.param('verb', verb, 2);
    var y = x;
    ___Program.set('y', y, 3);
    ___Program.returnState = 'I want to ' + verb + ' ' + y.name;
    ___Program.return(___functionId, 4);
    return ___Program.returnState;
    ___Program.return(___functionId, 5);
}.___fn();
___Program.set('f', f, 2);
var result = f('eat');
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
   "value": "charlie"
  },
  {
   "id": 1,
   "snapshot": "{\"name\":\"charlie\"}"
  },
  {
   "id": 5,
   "pointer": 4
  },
  {
   "id": 6,
   "invoke": 4
  },
  {
   "id": 7,
   "value": "eat"
  },
  {
   "id": 8,
   "pointer": 1
  },
  {
   "id": 6,
   "return": {
    "value": "I want to eat charlie"
   }
  },
  {
   "id": 9,
   "value": "I want to eat charlie"
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
   "name": "x",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "property",
   "name": "name",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  },
  {
   "id": 4,
   "type": "function",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  },
  {
   "id": 5,
   "type": "var",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  },
  {
   "id": 6,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 4,
   "function": 4
  },
  {
   "id": 7,
   "type": "param",
   "name": "verb",
   "block": 0,
   "scope": 6,
   "createdAt": 5
  },
  {
   "id": 8,
   "type": "var",
   "name": "y",
   "block": 0,
   "scope": 6,
   "createdAt": 6
  },
  {
   "id": 9,
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 8
  }
 ],
 "scopes": {
  "0": {
   "x": 2,
   "x[name]": 3,
   "f": 5,
   "result": 9
  },
  "6": {
   "verb": 7,
   "y": 8
  }
 }
}
}