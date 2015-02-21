module.exports = {
input: function() {
var f = function () {
  return 1;
};
var result = f();
},
output: function() {
var f = function () {
    ___Program.invoke('f');
    ___Program.returnState = 1;
    ___Program.return('f');
    return ___Program.returnState;
    ___Program.return('f');
};
___Program.function('f', f);
var result = f();
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
   "id": 2,
   "return": 1
  },
  {
   "id": 3,
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
   "name": "result",
   "block": 0,
   "scope": 0,
   "createdAt": 3
  }
 ],
 "scopes": {
  "0": {
   "f": 1,
   "result": 3
  },
  "2": {}
 }
}
}