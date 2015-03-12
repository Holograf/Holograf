var Traverse = function (processes) {

  process.setDefaults();
  for (var key in processes) {
    process[key] = processes[key];
  }

  this.start = traverse.start;

};

var traverse = {};
var process = {};

traverse.start = function (syntaxTree) {
  traverse.initialize(syntaxTree);
  traverse.body(syntaxTree.body, syntaxTree, 'body');
}

traverse.initialize = function (syntaxTree) {
  process.program(syntaxTree);
}

traverse.body = function (body, parent, origin) {
  var index = new Index(parent);
  for (index.position; index.position < body.length; index.position++) {
    var node = body[index.position];
    traverse.node(node, parent, origin, index);
  }
}

traverse.node = function (node, parent, origin, index, arrayIndex) {
  if (node) {
    process.node(node, parent, origin, index, arrayIndex);

    if (node.type === 'VariableDeclaration') {
      traverse.variableDeclaration(node, parent, origin, index);
    }
    if (node.type === 'FunctionExpression') {
      process.functionExpression(node, parent, origin, index);
      traverse.function(node, parent, origin, index);
    }
    if (node.type === 'FunctionDeclaration') {
      process.functionDeclaration(node, parent, origin, index);
      traverse.function(node, parent, origin, index);
    }
    if (node.type === 'ReturnStatement') {
      process.returnStatement(node, parent, origin, index);
      traverse.node(node.argument, node, 'argument', index);
    }
    if (node.type === 'BinaryExpression') {
      process.binaryExpression(node, parent, origin, index);
      traverse.binaryExpression(node, parent, origin, index)
    }
    if (node.type === 'ExpressionStatement') {
      if (isNotInjectedFunction(node)) {
        process.expressionStatement(node, parent, origin, index);
        traverse.node(node.expression, node, 'expression', index);
      }
    }
    if (node.type === 'ObjectExpression') {
      process.objectExpression(node, parent, origin, index);
      traverse.object(node, node, 'properties', index);
    }
    if (node.type === 'ArrayExpression') {
      process.arrayExpression(node, parent, origin, index);
      traverse.array(node, node, 'elements', index);
    }
    if (node.type === 'IfStatement') {
      process.ifStatement(node, parent, origin, index);
      traverse.conditional(node, parent, origin, index);
    }
    if (node.type === 'ForStatement') {
      process.forStatement(node, parent, origin, index);
      traverse.forStatement(node, parent, origin, index);
    }
    if (node.type === 'ForInStatement') {
      process.forInStatement(node, parent, origin, index);
      traverse.forInStatement(node, parent, origin, index);
    }
    if (node.type === 'WhileStatement') {
      process.whileStatement(node, parent, origin, index);
      traverse.loop(node, parent, origin, index);
    }
    if (node.type === 'DoWhileStatement') {
      process.doWhileStatement(node, parent, origin, index);
      traverse.loop(node, parent, origin, index);
    }
    if (node.type === 'MemberExpression') {
      if (isNotInjectedFunction(node)) {
        process.memberExpression(node, parent, origin, index);
        traverse.memberExpression(node, parent, origin, index);
      }
    }
    if (node.type === 'AssignmentExpression') {
      process.assignmentExpression(node, parent, origin, index);
      traverse.assignmentExpression(node, parent, origin, index);
    }
    if (node.type === 'UpdateExpression') {
      process.updateExpression(node, parent, origin, index);
      traverse.updateExpression(node, parent, origin, index);
    }
    if (node.type === 'CallExpression') {
      process.callExpression(node, parent, origin, index);
      traverse.callExpression(node, parent, origin, index);
    }
    if (node.type === 'ConditionalExpression') {
      process.conditionalExpression(node, parent, origin, index);
      traverse.conditional(node, parent, origin, index);
    }
    if (node.type === 'LogicalExpression') {
      process.logicalExpression(node, parent, origin, index);
      traverse.logicalExpression(node, parent, origin, index);
    }
    if (node.type === 'BlockStatement') {
      process.blockStatement(node, parent, origin, index);
      traverse.body(node.body, node, 'body');
    }
  }
}

traverse.variableDeclaration = function (node, parent, origin, index) {
  var declarations = node.declarations;
  for (var i = 0; i < declarations.length; i++) {
    var declaration = declarations[i];
    process.variableDeclaration(declaration, node, 'declarations', index);
    traverse.node(declaration, node, 'declarations', index, i);
    if (declaration.id) {
      traverse.node(declaration.id, declaration, 'id', index);
    }
    if (declaration.init) {
      traverse.node(declaration.init, declaration, 'init', index);
    }
  }
}

traverse.memberExpression = function (node, parent, origin, index) {
  traverse.node(node.object, node, 'object', index);
  traverse.node(node.property, node, 'property', index);
}

traverse.binaryExpression = function (node, parent, origin, index) {
  traverse.node(node.left, node, 'left', index);
  traverse.node(node.right, node, 'right', index);
}

traverse.assignmentExpression = function (node, parent, origin, index) {
  traverse.node(node.left, node, 'left', index);
  traverse.node(node.right, node, 'right', index);
}

traverse.updateExpression = function (node, parent, origin, index) {
  traverse.node(node.argument, node, 'argument', index);
}

traverse.callExpression = function (node, parent, origin, index) {
  traverse.node(node.callee, node, 'callee', index);
  for (var i = 0; i < node.arguments.length; i++) {
    traverse.node(node.arguments[i], node, 'arguments', index, i);
  }
}

traverse.array = function (node, parent, origin, index) {
  var elements = node.elements;
  for (var i = 0; i < elements.length; i++) {
    traverse.node(elements[i], node, 'element', index, i);
  }
}

traverse.object = function (node, parent, origin, index) {
  var properties = node.properties;
  for (var i = 0; i < properties.length; i++) {
    traverse.property(properties[i], node, index, i);
  }
}

traverse.property = function (property, parent, origin, index) {
  traverse.node(property, parent, 'property', index);
  traverse.node(property.key, property, 'key', index);
  traverse.node(property.value, property, 'value', index);
}



traverse.conditional = function (node, parent, origin, index) {
  traverse.node(node.test, node, 'test', index);
  if (node.consequent) {
    if (node.consequent.body) {
      traverse.node(node.consequent, node, 'consequent', index);
    } else { 
      node.consequent = {
        body: [node.consequent],
        loc: node.loc,
        type: 'BlockStatement'
      }
      traverse.node(node.consequent, node, 'consequent', index);
    }
  }
  if (node.alternate) {
    if (node.alternate.body) {
      traverse.node(node.alternate, node, 'alternate', index);
    } else if (node.alternate.consequent) {
      traverse.node(node.alternate, node, 'alternate', index);
    }
    else { 
      node.alternate = {
        body: [node.alternate],
        loc: node.loc,
        type: 'BlockStatement'
      }
      traverse.node(node.alternate, node, 'alternate', index);
    }
  }
}

traverse.logicalExpression = function (node, parent, origin, index) {
  traverse.node(node.left, node, 'left', index);
  traverse.node(node.right, node, 'right', index);
}

traverse.forStatement = function (node, parent, origin, index) {
  traverse.node(node.init, node, 'init', index);
  traverse.loop(node, parent, origin, index);
}

traverse.forInStatement = function (node) {
  traverse.node(node.init, node, 'init', index);
  traverse.loop(node, parent, origin, index);
}

traverse.loop = function (node, parent, origin, index) {
  traverse.node(node.test, node, 'test', index);
  if (node.body.body) {
    traverse.body(node.body.body, node, 'body', index);
  } else {
    traverse.body(node.body, node, 'body', index);
  } 
}

traverse.function = function (node, parent, origin, index) {
  for (var i = 0; i < node.params.length; i++) {
    traverse.node(node.params[i], node, 'params', index, i);
  }
  traverse.body(node.body.body, node, 'body', index);
}





var Index = function (parent) {
  this.position = 0;
  this.advance = function (n) {
    if (n === undefined) { n = 1; }
    this.position += n;
  }
  this.parent = parent;
}

var isNotInjectedFunction = function (node) {
  if (node.object) {
    return (node.object.name !== '___Program');
  } else {
    return true;
  }
}

process.defaultProcess = function (node, parent, origin, index) {
  return node;
}

process.setDefaults = function () {
  for (var i = 0; i < process.processNames.length; i++) {
    var processName = process.processNames[i];
    process[processName] = process.defaultProcess;
  }
}

process.processNames = [
  'node',
  'programBody',
  'blockStatement',
  'conditionalExpression',
  'callExpression',
  'memberExpression',
  'whileStatement',
  'doWhileStatement',
  'forStatement',
  'ifStatement',
  'arrayExpression',
  'objectExpression',
  'expressionStatement',
  'binaryExpression',
  'returnStatement',
  'functionDeclaration',
  'functionExpression',
  'variableDeclaration',
  'updateExpression',
  'assignmentExpression',
  'logicalExpression'
]

module.exports = Traverse;