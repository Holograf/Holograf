var inject = require('../Injector');
var Promise = require('bluebird');
var Traverse = require('../Traverse');


var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {

    var processes = {
      forStatement: forStatement,
      forInStatement: forInStatement,
      whileStatement: whileStatement,
      doWhileStatement: doWhileStatement
    }
    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);
    
    resolve(syntaxTree);
  });
}


var forStatement = function (node, parent, origin, index) {
  wrapLoop(node, index, 'for');
  injectLoopBody(node, parent, origin, index);
}

var forInStatement = function (node, parent, origin, index) {
  forStatement(node, parent, origin, index);
}

var whileStatement = function (node, parent, origin, index) {
  wrapLoop(node, index, 'while');
  injectLoopBody(node, parent, origin, index);
}

var doWhileStatement = function (node, parent, origin, index) {
  wrapLoop(node, index, 'do');
  injectLoopBody(node, parent, origin, index);
}

var wrapLoop = function (node, index, type) {
  var loopOpenNode = inject.createNode.loop(type);
  loopOpenNode.addArgument('open');
  loopOpenNode.addArgument(node.___id);
  inject.before(loopOpenNode, index);

  var loopCloseNode = inject.createNode.loop(type);
  loopCloseNode.addArgument('close');
  loopCloseNode.addArgument(node.___id);
  inject.after(loopCloseNode, index); 
}

var injectLoopBody = function (node, parent, origin, index) {
  var injectionPoint = node.body;

  if (!injectionPoint.body) {
    node.body = {
      type: 'BlockStatement',
      loc: injectionPoint.loc,
      body: [injectionPoint]
    }
    injectionPoint = node.body;
  }

  if (node.type === 'ForStatement' || node.type === 'ForInStatement') {
    var injectedNode;
    if (node.type === 'ForInStatement') {
      var declarations = node.left.declarations;
    } else {
      var declarations = node.init.declarations;
    }

    for (var i = 0; i < declarations.length; i++) {
      var name = declarations[0].id.name;
      injectedNode = inject.createNode.set(name, node.___id);
      injectionPoint.body.unshift(injectedNode);
    }

    injectedNode = inject.createNode.loop('for');
    injectedNode.addArgument('cycle');
    injectedNode.addArgument(node.___id);
    injectionPoint.body.unshift(injectedNode);
  }

  if (node.type === 'WhileStatement' || node.type === 'DoWhileStatement') {
    var type = (node.type === 'WhileStatement') ? 'while' : 'do';
    var injectedNode = inject.createNode.loop(type);
    injectedNode.addArgument('cycle');
    injectedNode.addArgument(node.___id);
    injectionPoint.body.unshift(injectedNode);
  }
}



module.exports = Parser;