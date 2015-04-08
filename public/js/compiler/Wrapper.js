var esprimaParse = require('esprima').parse;
var inject = require('./Injector');
var Promise = require('bluebird');
var generateCode = require('escodegen').generate;
var Traverse = require('./Traverse');

var Wrapper = function (syntaxTree) {

  return new Promise (function (resolve, reject) {
    var programBody = syntaxTree.body;

    var processes = {
      objectExpression: objectExpression,
      arrayExpression: arrayExpression,
      functionExpression: functionExpression,
      functionDeclaration: functionDeclaration
    }

    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);

    resolve (syntaxTree);
  });
}


var objectExpression = function (node, parent, origin, index) {
  console.log('OBJECT!!!!', node, parent, origin, index.position);
  if (parent.body) {
    parent.body.splice(index, 1, wrapObject(node))
  } else if (node.___arrayIndex !==undefined) {
    parent[node.___origin][node.___arrayIndex] = wrapObject(node);
  } else {
    parent[origin] = wrapObject(node);
  }
}

var arrayExpression = function (node, parent, origin, index) {
  objectExpression(node, parent, origin, index);
}

var functionExpression = function (node, parent, origin, index) {
  if (parent.body) {
    parent.body.splice(index.position, 1, wrapFunction(node))
  } else {
    if (node.___arrayIndex !== undefined) {
      parent[origin][node.___arrayIndex] = wrapFunction(node);
    } else {
      parent[origin] = wrapFunction(node);
    }
    // console.log(generateCode(parent[origin]));
  }

}

var functionDeclaration = function (node, parent, origin, index) {
  var functionVariableDeclaration = wrapFunctionDeclaration(node);
  
  var name = functionVariableDeclaration.declarations[0].id.name;
  var functionSetExpression = inject.createNode.set(name, node.___id);

  if (parent.body.body) {
    parent = parent.body;
  }

  parent.body.splice(0, 0, functionSetExpression);
  parent.body.splice(0, 0, functionVariableDeclaration);

  index.advance(2);
}

var wrapFunction = function (functionNode) {
  var wrappedNode = wrapNode(functionNode, '___fn');
  return wrappedNode;
}

var wrapFunctionDeclaration = function (functionNode) {
  var name = functionNode.id.name;
  var functionIdentifier = {
    "type": "Identifier",
    "name": name
  }
  var wrappedNode = wrapNode(functionIdentifier, '___fn');
  var variableDeclaration = {
    type: 'VariableDeclaration',
    declarations: [ {
      type: 'VariableDeclarator',
      id: {
        type: 'Identifier',
        name: name
      },
      init: wrappedNode
    } ],
    kind: 'var'
  }
  return variableDeclaration;
}

var wrapObject = function (objectNode) {
  return wrapNode(objectNode, '___obj');
}

var wrapNode = function (node, type) {
  var wrappedNode = {
    "type": "CallExpression",
    "callee": {
      "type": "MemberExpression",
      "computed": false,
      "object": node,
      "property": {
        "type": "Identifier",
        "name": type
      }
    },
    "arguments": []
  }
  return wrappedNode; 
}



module.exports = Wrapper;