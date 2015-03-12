var esprima = require('esprima');
var generate = require('escodegen').generate;

var inject = {};

inject.after = function (injectedNode, index) {
  var injectionPoint = inject.getInjectionPoint(index);
  injectionPoint.splice(index.position + 1, 0, injectedNode);
  index.advance();
}

inject.before = function (injectedNode, index) {
  var injectionPoint = inject.getInjectionPoint(index);
  injectionPoint.splice(index.position, 0, injectedNode);
  index.advance();
}

inject.spliceOut = function (index) {
  var injectionPoint = inject.getInjectionPoint(index);
  injectionPoint.splice(index.position, 1);
}

inject.getInjectionPoint = function (index) {
  if (index.parent.body.body) {
    var injectionPoint = index.parent.body.body;
  } else {
    var injectionPoint = index.parent.body
  }
  return injectionPoint; 
}

var insertArrayAt = function (array, index, arrayToInsert) {
  Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
}




inject.createNode = {};

inject.createNode.set = function (name, codeId) {
  return inject.generateNode(name, codeId, 'set');
}

inject.createNode.param = function (name, codeId) {
  return inject.generateNode(name, codeId, 'param');
}

inject.createNode.invoke = function (name, codeId) {
  var code = inject.createProgramMethod('invoke');
  var injectedNode = inject.codeToNode(code);
  return injectedNode;
}

inject.createNode.return = function (name, codeId) {
  var code = inject.createProgramMethod('return');
  var injectedNode = inject.codeToNode(code);
  return injectedNode;  
}

inject.createNode.enter = function (type) {
  var code = inject.createProgramMethod('enter');
  var injectedNode = inject.codeToNode(code);
  injectedNode.addArgument(type);
  return injectedNode;    
}

inject.createNode.block = function (type) {
  var code = inject.createProgramMethod('block');
  var injectedNode = inject.codeToNode(code);
  injectedNode.addArgument(type);
  return injectedNode;
}

inject.createNode.loop = function (type) {
  var code = inject.createProgramMethod('loop');
  var injectedNode = inject.codeToNode(code);
  injectedNode.addArgument(type);
  return injectedNode;
}

inject.createNode.setInvocationPoint = function (codeId) {
  var code = inject.createProgramMethod('setInvocationPoint');
  var injectedNode = inject.codeToNode(code);
  injectedNode.addArgument(codeId);
  return injectedNode;
}

inject.createNode.functionCallee = function () {
  var injectedNode = esprima.parse("var ___functionId = arguments.callee.___id");
  return injectedNode.body[0];
}


inject.generateNode = function (name, codeId, method) {
  var code = inject.createProgramMethod(method);
  var injectedNode = inject.codeToNode(code);
  injectedNode.addTarget(name);
  injectedNode.addArgument(codeId);
  return injectedNode; 
}

inject.createProgramMethod = function (method) {
  var args = Array.prototype.slice.call(arguments, 1);
  var code = "___Program." + method + "( );";
  return code;
}

inject.codeToNode = function (code) {
  var program = esprima.parse(code);
  var injectedNode = program.body[0];

  Object.defineProperty(injectedNode, 'addArgument', {
    value: function (argument, type) {
      if (type === 'Identifier') {
        this.expression.arguments.push({
          "type": 'Identifier',
          "name": argument
        });
      } else {
        this.expression.arguments.push({
          "type": 'Literal',
          "value": argument,
          "raw": JSON.stringify(argument)
        });
      }
    },
    enumerable: false
  });
  Object.defineProperty(injectedNode, 'addTarget', {
    value: function (argument) {
      this.addArgument(argument);
      this.addArgument(argument, 'Identifier');
    },
    enumerable: false
  });

  return injectedNode;
}



module.exports = inject;