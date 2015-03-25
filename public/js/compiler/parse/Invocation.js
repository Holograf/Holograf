var inject = require('../Injector');
var Promise = require('bluebird');
var Traverse = require('../Traverse');


var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {

    var programBody = syntaxTree.body;

    var processes = {
      callExpression: callExpression
    }
    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);
    
    resolve(syntaxTree);
  });
}


var callExpression = function (node, parent, origin, index) {
  if (node.callee.object && node.callee.object.name !== '___Program') {
    var injectedNode = inject.createNode.setInvocationPoint(node.___id);
    inject.before(injectedNode, index);
  } else if (node.callee.name) {
    var injectedNode = inject.createNode.setInvocationPoint(node.___id);
    inject.before(injectedNode, index);    
  }
}



module.exports = Parser;