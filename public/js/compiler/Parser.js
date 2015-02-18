var esprimaParse = require('esprima').parse;
var inject = require('./Inject');

// External variable to help manage tracking of function invocations
var functionStack = [];

var Parser = function (code) {
  var syntaxTree = esprimaParse(code);
  var programBody = syntaxTree.body;

  // console.log(JSON.stringify(syntaxTree, null, 2));
  traverse(programBody);
  return syntaxTree;
}

var traverseFunction = function (fn, name) {
  var functionBody = fn.body
  var params = fn.params;

  functionStack.push(name);

  // Inject invocation and parameter watchers inside the function body 
  inject.invoke(functionBody, name, params);
  traverse(functionBody.body);

  functionStack.pop();
}

var traverseMethod = function (method, name) {
  var methodBody = method.body;
  var params = method.params;

  functionStack.push(name);

  // Inject invocation and parameter watchers inside the function body 
  inject.method(methodBody, name, params);
  traverse(methodBody.body);

  functionStack.pop();
}

var traverseObjectProperties = function (properties, objName) {
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    var keyName = objName + '.' + property.key.name;
    
    if (property.value.type === 'FunctionExpression') {
      traverseMethod(property.value, keyName);
    } else if (property.value.type === 'ObjectExpression') {
      traverseObjectProperties(property.value.properties, keyName);
    }
  }
}

var injectBefore = function (node, body, index, type, param) {
  body.splice(index, 0, inject[type](node, param));
}

var injectAfter = function (node, body, index, type, param) {
  body.splice(index + 1, 0, inject[type](node, param));
}

var getLastFunction = function () {
  return functionStack[functionStack.length - 1];
}


var traverse = function (body) {
  var advance = function (n) { index += n; }

  for (var index = 0; index < body.length; index++) {
    var node = body[index];

    if (node.type === 'VariableDeclaration') {
      var declaration = node.declarations[0]
      var declarationType = declaration.init.type;

      if (declarationType === 'FunctionExpression') { // ie var f = function () { return 1; };
        var fn = declaration;
        traverseFunction(fn.init, fn.id.name);
        injectAfter(node, body, index, 'function');
      } 
      else if (declarationType === 'ObjectExpression') { // ie var obj = {name: 'andy'};
        var objName = declaration.id.name;
        var properties = declaration.init.properties;
        traverseObjectProperties(properties, objName);

        injectAfter(node, body, index, 'object');
      }
      else { 
        injectAfter(node, body, index, 'variable'); // ie var x = 12;
      }
    }

    if (node.type === 'ReturnStatement') {
      injectBefore(node, body, index, 'returnState');
      injectAfter(node, body, index, 'return', getLastFunction());
      advance(2);
    }

    if (node.type === 'ForStatement') {
      injectBefore(node, body, index, 'loopInit', 'for');
      injectAfter(node, body, index, 'loopOpen', 'for');
      injectAfter(node, body, index + 2, 'loopClose', 'for');
      injectAfter(node, body, index + 3, 'loopPost', 'for');
      advance(4);
    }

    if (node.type === 'WhileStatement') {
      injectBefore(node, body, index, 'loopOpen', 'while');
      injectAfter(node, body, index + 1, 'loopClose', 'while');
      advance(2);
    }

    if (node.type === 'DoWhileStatement') {
      injectBefore(node, body, index, 'loopOpen', 'do');
      injectAfter(node, body, index + 1, 'loopClose', 'do');
      advance(2)
    }

    // Traverse loop bodies
    if (node.body) {
      var block = node.body;
      traverse(block.body);
    }

    if (node.type === 'IfStatement') { 
      injectBefore(node, body, index, 'ifOpen', 'do');
      injectAfter(node, body, index + 1, 'ifClose', 'do');
      advance(2);

      // Traverse if statement tree
      var traverseIf = function (node) {
        if (node.consequent && node.consequent.body) {
          traverse(node.consequent.body);
        }
        if (node.alternate) {
          if (node.alternate.body) {
            traverse(node.alternate.body);
          } else {
            traverseIf(node.alternate);
          }
        }
      }
      traverseIf(node);
    }


    if (node.type === 'ExpressionStatement' && inject.isNotInjectedFunction(node)) {

      if (node.expression.type === 'UpdateExpression') { // ie x++;
        injectAfter(node, body, index, 'expression');
        advance(1);
      } else if (node.expression.type === 'CallExpression') {

      } else if (node.expression.type === 'AssignmentExpression') {
        var left = node.expression.left;
        var right = node.expression.right;

        if (left.type === 'MemberExpression') {
          injectAfter(node, body, index, 'memberExpression');
          advance(1);
        } else {
          injectAfter(node, body, index, 'expression');
          advance(1);
        }

        if (right.type === 'ObjectExpression') {
          injectAfter(node, body, index, 'object');
          advance(1);
        } 

        if (right.type === 'FunctionExpression') {
          if (node.expression.left.object) {
            var name = inject.traverseMemberExpression(node.expression.left);
          } else { 
            var name = node.expression.left.name;
          }

          traverseFunction(node.expression.right, name);
        }
      }
    }
  }
}



module.exports = Parser;