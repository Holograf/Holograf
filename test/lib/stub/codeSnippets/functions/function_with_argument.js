module.exports = {
input: function() {
var f = function (n) {
  n++;
}
f(3);
},
output: function() {
var f = function (n) {
    ___Program.invoke('f');
    ___Program.param('n', n);
    n++;
    ___Program.set('n', n);
    ___Program.return('f');
};
___Program.function('f', f);
f(3);
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
   "id": 3,
   "value": 4
  },
  {
   "id": 2,
   "return": "___undefined"
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
   "name": "n",
   "block": 0,
   "scope": 2,
   "createdAt": 2
  }
 ],
 "scopes": {
  "0": {
   "f": 1
  },
  "2": {
   "n": 3
  }
 }
}
}