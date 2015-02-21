module.exports = {
input: function() {
var fibonacci = function (n) {
  if (n < 2){
    return 1;
  }else{
    return fibonacci(n-2) + fibonacci(n-1);
  }
}
fibonacci(3);
},
output: function() {
var fibonacci = function (n) {
    ___Program.invoke('fibonacci');
    ___Program.param('n', n);
    ___Program.block('if', 2);
    if (n < 2) {
        ___Program.enter('if', 0);
        ___Program.returnState = 1;
        ___Program.return('fibonacci');
        return ___Program.returnState;
    } else {
        ___Program.enter('if', 1);
        ___Program.returnState = fibonacci(n - 2) + fibonacci(n - 1);
        ___Program.return('fibonacci');
        return ___Program.returnState;
    }
    ___Program.block('if', 'close');
    ___Program.return('fibonacci');
};
___Program.function('fibonacci', fibonacci);
fibonacci(3);
},
data: {
 "programSteps": [
  {
   "id": 1,
   "value": "___function code"
  },
  {
   "id": 2,
   "invoke": "fibonacci"
  },
  {
   "id": 3,
   "param": 3
  },
  {
   "id": 4,
   "if": 2
  },
  {
   "id": 4,
   "enter": 1
  },
  {
   "id": 5,
   "invoke": "fibonacci"
  },
  {
   "id": 6,
   "param": 1
  },
  {
   "id": 7,
   "if": 2
  },
  {
   "id": 7,
   "enter": 0
  },
  {
   "id": 5,
   "return": 1
  },
  {
   "id": 8,
   "invoke": "fibonacci"
  },
  {
   "id": 9,
   "param": 2
  },
  {
   "id": 10,
   "if": 2
  },
  {
   "id": 10,
   "enter": 1
  },
  {
   "id": 11,
   "invoke": "fibonacci"
  },
  {
   "id": 12,
   "param": 0
  },
  {
   "id": 13,
   "if": 2
  },
  {
   "id": 13,
   "enter": 0
  },
  {
   "id": 11,
   "return": 1
  },
  {
   "id": 14,
   "invoke": "fibonacci"
  },
  {
   "id": 15,
   "param": 1
  },
  {
   "id": 16,
   "if": 2
  },
  {
   "id": 16,
   "enter": 0
  },
  {
   "id": 14,
   "return": 1
  },
  {
   "id": 8,
   "return": 2
  },
  {
   "id": 2,
   "return": 3
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
   "name": "fibonacci",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "invoke",
   "name": "fibonacci",
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
  },
  {
   "id": 4,
   "type": "block",
   "name": "if",
   "block": 0,
   "scope": 2,
   "createdAt": 3,
   "paths": 2
  },
  {
   "id": 5,
   "type": "invoke",
   "name": "fibonacci",
   "block": 4,
   "scope": 2,
   "createdAt": 5,
   "function": 1
  },
  {
   "id": 6,
   "type": "var",
   "name": "n",
   "block": 4,
   "scope": 5,
   "createdAt": 6
  },
  {
   "id": 7,
   "type": "block",
   "name": "if",
   "block": 4,
   "scope": 5,
   "createdAt": 7,
   "paths": 2
  },
  {
   "id": 8,
   "type": "invoke",
   "name": "fibonacci",
   "block": 4,
   "scope": 2,
   "createdAt": 10,
   "function": 1
  },
  {
   "id": 9,
   "type": "var",
   "name": "n",
   "block": 4,
   "scope": 8,
   "createdAt": 11
  },
  {
   "id": 10,
   "type": "block",
   "name": "if",
   "block": 4,
   "scope": 8,
   "createdAt": 12,
   "paths": 2
  },
  {
   "id": 11,
   "type": "invoke",
   "name": "fibonacci",
   "block": 10,
   "scope": 8,
   "createdAt": 14,
   "function": 1
  },
  {
   "id": 12,
   "type": "var",
   "name": "n",
   "block": 10,
   "scope": 11,
   "createdAt": 15
  },
  {
   "id": 13,
   "type": "block",
   "name": "if",
   "block": 10,
   "scope": 11,
   "createdAt": 16,
   "paths": 2
  },
  {
   "id": 14,
   "type": "invoke",
   "name": "fibonacci",
   "block": 10,
   "scope": 8,
   "createdAt": 19,
   "function": 1
  },
  {
   "id": 15,
   "type": "var",
   "name": "n",
   "block": 10,
   "scope": 14,
   "createdAt": 20
  },
  {
   "id": 16,
   "type": "block",
   "name": "if",
   "block": 10,
   "scope": 14,
   "createdAt": 21,
   "paths": 2
  }
 ],
 "scopes": {
  "0": {
   "fibonacci": 1
  },
  "2": {
   "n": 3
  },
  "5": {
   "n": 6
  },
  "8": {
   "n": 9
  },
  "11": {
   "n": 12
  },
  "14": {
   "n": 15
  }
 }
}
}