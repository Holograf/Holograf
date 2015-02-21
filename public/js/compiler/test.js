var parse = require('./Parser');
var generateCode = require('escodegen').generate;




var test = function () {
  console.log(generateCode(testData));
}

testData = {
 "type": "Program",
 "body": [
  {
   "type": "VariableDeclaration",
   "declarations": [
    {
     "type": "VariableDeclarator",
     "id": {
      "type": "Identifier",
      "name": "x"
     },
     "init": {
      "type": "ObjectExpression",
      "properties": []
     }
    }
   ],
   "kind": "var"
  },
  {
   "type": "ExpressionStatement",
   "expression": {
    "type": "CallExpression",
    "callee": {
     "type": "MemberExpression",
     "computed": false,
     "object": {
      "type": "Identifier",
      "name": "___Program"
     },
     "property": {
      "type": "Identifier",
      "name": "object"
     }
    },
    "arguments": [
     {
      "type": "Literal",
      "value": "x",
      "raw": "\"x\""
     },
     {
      "type": "Identifier",
      "name": "x"
     },
     {
      "type": "Literal",
      "value": "{}",
      "raw": "\"{}\""
     }
    ]
   }
  },
  {
   "type": "ExpressionStatement",
   "expression": {
    "type": "AssignmentExpression",
    "operator": "=",
    "left": {
     "type": "MemberExpression",
     "computed": false,
     "object": {
      "type": "Identifier",
      "name": "x"
     },
     "property": {
      "type": "Identifier",
      "name": "a"
     }
    },
    "right": {
     "type": "Literal",
     "value": 1,
     "raw": "1"
    }
   }
  },
  {
   "type": "ExpressionStatement",
   "expression": {
    "type": "CallExpression",
    "callee": {
     "type": "MemberExpression",
     "computed": false,
     "object": {
      "type": "Identifier",
      "name": "___Program"
     },
     "property": {
      "type": "Identifier",
      "name": "setObjectProperty"
     }
    },
    "arguments": [
     {
      "type": "Literal",
      "value": "x.a",
      "raw": "\"x.a\""
     },
     {
      "type": "Identifier",
      "name": "x.a"
     }
    ]
   }
  }
 ]
}



test();

