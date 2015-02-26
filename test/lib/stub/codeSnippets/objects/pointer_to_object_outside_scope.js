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
var x = { name: 'charlie' };
___Program.object('x', x, '{}');
var f = function (verb) {
    ___Program.invoke('f');
    ___Program.param('verb', verb);
    var y = x;
    ___Program.set('y', y, 'x');
    ___Program.returnState = 'I want to ' + verb + ' ' + y.name;
    ___Program.return('f');
    return ___Program.returnState;
    ___Program.return('f');
};
___Program.function('f', f);
var result = f('eat');
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
   "value": "charlie"
  },
  {
   "id": 4,
   "value": "___function code"
  },
  {
   "id": 5,
   "invoke": "f"
  },
  {
   "id": 6,
   "param": "eat"
  },
  {
   "id": 7,
   "pointer": 1
  },
  {
   "id": 5,
   "return": "I want to eat charlie"
  },
  {
   "id": 8,
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
   "type": "var",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 2
  },
  {
   "id": 5,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 3,
   "function": 4
  },
  {
   "id": 6,
   "type": "var",
   "name": "verb",
   "block": 0,
   "scope": 5,
   "createdAt": 4
  },
  {
   "id": 7,
   "type": "var",
   "name": "y",
   "block": 0,
   "scope": 5,
   "createdAt": 5
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
   "x": 2,
   "x[name]": 3,
   "f": 4,
   "result": 8
  },
  "5": {
   "verb": 6,
   "y": 7
  }
 }
}
}