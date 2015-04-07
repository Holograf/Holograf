var inject = require('../Injector');
var Promise = require('bluebird');
var Traverse = require('../Traverse');


var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {

    var processes = {
      ifStatement: ifStatement
    }
    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);
    
    resolve(syntaxTree);
  });
}


var ifStatement = function (node, parent, origin, index) {
  var paths = 0;

  var traverseConditional = function (node) {
    var injectionPoint = node.consequent ? node.consequent : node;
    var codeId = injectionPoint.___id;

    var injectedNode = inject.createNode.if('enter');
    injectedNode.addArgument(paths++);
    injectedNode.addArgument(codeId);
    injectionPoint.body.unshift(injectedNode);

    if (node.alternate) {
      traverseConditional(node.alternate);
    }
  }

  if (node.___parent.type !== 'IfStatement') {
    traverseConditional(node);

    wrapIf(node, index, paths);
  }
}


var wrapIf = function (node, index, paths) {
  // Create the if block opening statement
  var injectedNode = inject.createNode.if('open');
  injectedNode.addArgument(paths);
  injectedNode.addArgument(node.___id);
  inject.before(injectedNode, index);

  // Create the if block closing statement
  injectedNode = inject.createNode.if('close');
  injectedNode.addArgument(paths);
  injectedNode.addArgument(node.___id);
  inject.after(injectedNode, index);
}





module.exports = Parser;