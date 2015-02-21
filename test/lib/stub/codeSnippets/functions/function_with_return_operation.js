module.exports = {
input: function() {
var f = function (x) {
  return x * 2;
}
var result = f(3);
},
output: function() {
var f = function (x) {
    ___Program.invoke('f');
    ___Program.param('x', x);
    ___Program.returnState = x * 2;
    ___Program.return('f');
    return ___Program.returnState;
    ___Program.return('f');
};
___Program.function('f', f);
var result = f(3);
___Program.set('result', result);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": "___function code"
  },
  {
   "id": 2,
   "invoke": "f"
  },
  {
   "id": 3,
   "param": 3
  },
  {
   "id": 2,
   "return": 6
  },
  {
   "id": 4,
   "value": 6
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
   "type": "var",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "invoke",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 3,
   "type": "var",
   "name": "x",
   "block": 0,
   "scope": 2,
   "createdAt": 2
  },
  {
   "id": 4,
   "type": "var",
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 4
  }
 ],
 "scopes": {
  "0": {
   "f": 1,
   "result": 4
  },
  "2": {
   "x": 3
  }
 }
}
}