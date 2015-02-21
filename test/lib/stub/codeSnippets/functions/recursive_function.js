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
    var ___functionId = arguments.callee.___id;
    ___Program.invoke(___functionId);
    ___Program.param('n', n);
    ___Program.block('if', 2);
    if (n < 2) {
        ___Program.enter('if', 0);
        ___Program.returnState = 1;
        ___Program.return(___functionId);
        return ___Program.returnState;
    } else {
        ___Program.enter('if', 1);
        ___Program.returnState = fibonacci(n - 2) + fibonacci(n - 1);
        ___Program.return(___functionId);
        return ___Program.returnState;
    }
    ___Program.block('if', 'close');
    ___Program.return(___functionId);
}.___fn();
___Program.set('fibonacci', fibonacci);
fibonacci(3);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "invoke": 1
  },
  {
   "id": 4,
   "value": 3
  },
  {
   "id": 5,
   "if": 2
  },
  {
   "id": 5,
   "enter": 1
  },
  {
   "id": 6,
   "invoke": 1
  },
  {
   "id": 7,
   "value": 1
  },
  {
   "id": 8,
   "if": 2
  },
  {
   "id": 8,
   "enter": 0
  },
  {
   "id": 6,
   "return": {
    "value": 1
   }
  },
  {
   "id": 9,
   "invoke": 1
  },
  {
   "id": 10,
   "value": 2
  },
  {
   "id": 11,
   "if": 2
  },
  {
   "id": 11,
   "enter": 1
  },
  {
   "id": 12,
   "invoke": 1
  },
  {
   "id": 13,
   "value": 0
  },
  {
   "id": 14,
   "if": 2
  },
  {
   "id": 14,
   "enter": 0
  },
  {
   "id": 12,
   "return": {
    "value": 1
   }
  },
  {
   "id": 15,
   "invoke": 1
  },
  {
   "id": 16,
   "value": 1
  },
  {
   "id": 17,
   "if": 2
  },
  {
   "id": 17,
   "enter": 0
  },
  {
   "id": 15,
   "return": {
    "value": 1
   }
  },
  {
   "id": 9,
   "return": {
    "value": 2
   }
  },
  {
   "id": 3,
   "return": {
    "value": 3
   }
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
   "type": "var",
   "name": "fibonacci",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "invoke",
   "name": "fibonacci",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "function": 1
  },
  {
   "id": 4,
   "type": "param",
   "name": "n",
   "block": 0,
   "scope": 3,
   "createdAt": 2
  },
  {
   "id": 5,
   "type": "block",
   "name": "if",
   "block": 0,
   "scope": 3,
   "createdAt": 3,
   "paths": 2
  },
  {
   "id": 6,
   "type": "invoke",
   "name": "fibonacci",
   "block": 5,
   "scope": 3,
   "createdAt": 5,
   "function": 1
  },
  {
   "id": 7,
   "type": "param",
   "name": "n",
   "block": 5,
   "scope": 6,
   "createdAt": 6
  },
  {
   "id": 8,
   "type": "block",
   "name": "if",
   "block": 5,
   "scope": 6,
   "createdAt": 7,
   "paths": 2
  },
  {
   "id": 9,
   "type": "invoke",
   "name": "fibonacci",
   "block": 5,
   "scope": 3,
   "createdAt": 10,
   "function": 1
  },
  {
   "id": 10,
   "type": "param",
   "name": "n",
   "block": 5,
   "scope": 9,
   "createdAt": 11
  },
  {
   "id": 11,
   "type": "block",
   "name": "if",
   "block": 5,
   "scope": 9,
   "createdAt": 12,
   "paths": 2
  },
  {
   "id": 12,
   "type": "invoke",
   "name": "fibonacci",
   "block": 11,
   "scope": 9,
   "createdAt": 14,
   "function": 1
  },
  {
   "id": 13,
   "type": "param",
   "name": "n",
   "block": 11,
   "scope": 12,
   "createdAt": 15
  },
  {
   "id": 14,
   "type": "block",
   "name": "if",
   "block": 11,
   "scope": 12,
   "createdAt": 16,
   "paths": 2
  },
  {
   "id": 15,
   "type": "invoke",
   "name": "fibonacci",
   "block": 11,
   "scope": 9,
   "createdAt": 19,
   "function": 1
  },
  {
   "id": 16,
   "type": "param",
   "name": "n",
   "block": 11,
   "scope": 15,
   "createdAt": 20
  },
  {
   "id": 17,
   "type": "block",
   "name": "if",
   "block": 11,
   "scope": 15,
   "createdAt": 21,
   "paths": 2
  }
 ],
 "scopes": {
  "0": {
   "fibonacci": 2
  },
  "3": {
   "n": 4
  },
  "6": {
   "n": 7
  },
  "9": {
   "n": 10
  },
  "12": {
   "n": 13
  },
  "15": {
   "n": 16
  }
 }
}
}