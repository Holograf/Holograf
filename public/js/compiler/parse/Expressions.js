var inject = require('../Injector');
var Promise = require('bluebird');
var Traverse = require('../Traverse');


var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {

    var processes = {
      variableDeclaration: variableDeclaration,
      updateExpression: updateExpression,
      assignmentExpression: assignmentExpression
    }
    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);
    
    resolve(syntaxTree);
  });
}


var variableDeclaration = function (node, parent, origin, index) {
  var name = node.id.name;
  if (name !== '___functionId' && index) {
    var injectedNode = inject.createNode.set(name, node.___id);
    inject.after(injectedNode, index);
  }
}

var updateExpression = function (node, parent, origin, index) {
  var name = node.argument.name;
  if (index && node.argument.type !== 'MemberExpression') {
    var injectedNode = inject.createNode.set(name, node.___id);
    inject.after(injectedNode, index);
  }
}

var assignmentExpression = function (node, parent, origin, index) {
  var name = node.left.name;
  if (index && node.left.type !== 'MemberExpression') {
    var injectedNode = inject.createNode.set(name, node.___id);
    inject.after(injectedNode, index);
  }
}



module.exports = Parser;