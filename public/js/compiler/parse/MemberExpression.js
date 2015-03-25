var inject = require('../Injector');
var Promise = require('bluebird');
var Traverse = require('../Traverse');


var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {

    var processes = {
      memberExpression: memberExpression
    }
    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);
    
    resolve(syntaxTree);
  });
}

var memberExpression = function (node, parent, origin, index) {

  if (parent.type === 'AssignmentExpression') {
    var parentObject = getParentObject(node);
    var objectAccessor = getObjectAccessor(node);
    var expressionStatement = getObjectExpressionStatement(node, parentObject, objectAccessor)
    var setObjectProperty = getSetObjectProperty(node);

    inject.before(parentObject, index);
    inject.before(objectAccessor, index);
    inject.before(expressionStatement, index);
    inject.before(setObjectProperty, index);

    inject.spliceOut(index);


  }
}

var getParentObject = function (node) {
  var parentObject = node.object;
  var code = '___Program.parentObject = {};';
  var injectedNode = inject.codeToNode(code);
  injectedNode.expression.right = parentObject;
  return injectedNode;
}

var getObjectAccessor = function (node) {
  var objectAccessor = node.property;
  var code = '___Program.objectAccessor = {};';
  var injectedNode = inject.codeToNode(code);
  injectedNode.expression.right = objectAccessor;

  if (node.computed === false) {
    injectedNode.expression.right = {
      type: 'Literal',
      value: injectedNode.expression.right.name
    }
  }
  return injectedNode;
}

var getObjectExpressionStatement = function (node) {
  var rightExpression = node.___parent.right;
  var code = '___Program.parentObject[___Program.objectAccessor] = expression;';
  var injectedNode = inject.codeToNode(code);
  injectedNode.expression.right = rightExpression;
  return injectedNode;
}

var getSetObjectProperty = function (node) {
  var code = '___Program.setObjectProperty(___Program.parentObject, ___Program.objectAccessor);';
  var injectedNode = inject.codeToNode(code);
  injectedNode.addArgument(node.___id);
  return injectedNode;
}


module.exports = Parser;