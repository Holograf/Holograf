var inject = require('../Injector');
var Promise = require('bluebird');
var Traverse = require('../Traverse');


var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {

    var processes = {
      functionExpression: functionExpression,
      functionDeclaration: functionDeclaration,
      returnStatement: returnStatement
    }
    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);
    
    resolve(syntaxTree);
  });
}


var functionExpression = function (node, parent, origin, index) {
  var injectionPoint = node.body.body;

  // Create the parameter watchers
  for (var i = node.params.length - 1; i >= 0; i--) {
    var param = node.params[i];
    var name = param.name;
    var injectedNode = inject.createNode.param(name, param.___id);
    injectionPoint.unshift(injectedNode);
  }

  // Inject the ___Program.invoke(___functionId)
  var injectedNode = inject.createNode.invoke();
  injectedNode.addArgument('___functionId', 'Identifier');
  injectionPoint.unshift(injectedNode);

  // Inject the ___functionId = arguments.callee.___id
  var injectedNode = inject.createNode.functionCallee();
  injectionPoint.unshift(injectedNode);

  // Inject the implicit ___Program.return('fn name')
  var injectedNode = inject.createNode.return();
  injectedNode.addArgument('___functionId', 'Identifier');
  injectedNode.addArgument(node.___id);
  injectionPoint.push(injectedNode);
}

var functionDeclaration = function (node, parent, origin, index) {
  functionExpression(node, parent, origin, index);
}

var returnStatement = function (node, parent, origin, index) {
  // Inject the return state interceptor
  var code = '___Program.returnState = ___returnState;';
  var injectedNode = inject.codeToNode(code);

  if (node.argument) {
    injectedNode.expression.right = node.argument;
  } else {
    injectedNode.expression.right = {
      'type': 'Identifier',
      'name': 'undefined'
    }
  }
  inject.before(injectedNode, index);

  // Inject the ___Program.return(___functionId) node
  var injectedNode = inject.createNode.return();
  injectedNode.addArgument('___functionId', 'Identifier');
  injectedNode.addArgument(node.___id);
  inject.before(injectedNode, index); 

  // Change the return statement to return the intercepted return state value
  node.argument = {
    'type': 'Identifier',
    'name': '___Program.returnState'
  }
}




module.exports = Parser;