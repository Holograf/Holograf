var esprimaParse = require('esprima').parse;
var inject = require('./Inject');
var Promise = require('bluebird');

// External variables to help manage tracking of function invocations
var functionStack = [];
var wrappedFunctionCount = 0;

var Parser = function (code) {

  return new Promise (function (resolve, reject) {
    var syntaxTree = esprimaParse(code, {loc: true});
    var programBody = syntaxTree.body;
    
    traverse(programBody);  // Traverse the syntax tree to inject watchpoints
    injectObjectWrappers(programBody); // inject object registration methods onto all objects

    resolve(syntaxTree);
  });
}


var traverseFunction = function (fn) {
  var functionBody = fn.body
  var params = fn.params;

  // Inject invocation and parameter watchers inside the function body
  inject.invoke(functionBody, params);
  traverse(functionBody.body);
}

var traverseMethod = function (method, name) {
  var methodBody = method.body;
  var params = method.params;

  // Inject invocation and parameter watchers inside the function body 
  inject.method(methodBody, name, params);
  traverse(methodBody.body);
}

var traverseObjectProperties = function (properties, objName) {
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    var keyName = objName + '[' + property.key.name + ']';
    
    if (property.value.type === 'FunctionExpression') {
      traverseMethod(property.value, keyName);
    } else if (property.value.type === 'ObjectExpression') {
      traverseObjectProperties(property.value.properties, keyName);
    } else if (property.value.type === 'ArrayExpression') {
      traverseArrayElements(property.value.elements, keyName);
    }
  }
}

var traverseArrayElements = function (elements, arrName) {
  for (var index = 0; index < elements.length; index++) {
    var element = elements[index];
    var indexName = arrName + '[' + index + ']';
    
    if (element.type === 'FunctionExpression') {
      traverseFunction(element, '___anonymous');
    } else if (element.type === 'ObjectExpression') {
      traverseObjectProperties(element.properties, indexName);
    } else if (element.type === 'ArrayExpression') {
      traverseArrayElements(element.elements, indexName);
    } 
  }
}

var traverseArguments = function (args) {
  for (var index = 0; index < args.length; index++) {
    var arg = args[index];
    if (arg.type === 'FunctionExpression') {
      traverseFunction(arg, '___anonymous');
    } else if (arg.type === 'ObjectExpression') {
      traverseObjectProperties(arg.properties, indexName);
    } else if (arg.type === 'ArrayExpression') {
      traverseArrayElements(arg.elements, indexName);
    } 
  }
}

var injectBefore = function (node, body, index, type, param) {
  var injectedNode = inject[type](node, param);
  if (injectedNode) {
    body.splice(index, 0, injectedNode);
    if (node.loc && injectedNode.expression.arguments) {
      var line = node.loc.start.line;
      inject.addArgument(injectedNode, line);
    }
  }
  return injectedNode;
}

var injectAfter = function (node, body, index, type, param) {
  var injectedNode = inject[type](node, param);
  if (injectedNode) {
    body.splice(index + 1, 0, injectedNode);
    if (node.loc && injectedNode.expression.arguments) {
      var line = node.loc.start.line;
      inject.addArgument(injectedNode, line);
    }
  }
  return injectedNode;
}

var getLastFunction = function () {
  return functionStack[functionStack.length - 1];
}


var checkVariableDeclarations = function (node, body, index) {
  if (node.type === 'VariableDeclaration') {
    for (var i = 0; i < node.declarations.length; i++) {
      var declaration = node.declarations[i];
      

      if (declaration.init) { 
        var declarationType = declaration.init.type; 
      }

      if (declarationType === 'FunctionExpression') { // ie var f = function () { return 1; };
        traverseFunction(declaration.init);
        injectAfter(declaration, body, index, 'variable');
      } 
      else if (declarationType === 'ObjectExpression') { // ie var obj = {name: 'andy'};
        var objectName = declaration.id.name;
        var properties = declaration.init.properties;

        traverseObjectProperties(properties, objectName);
        injectAfter(declaration, body, index, 'variable');
      }
      else if (declarationType === 'ArrayExpression') { // ie var arr = [1, 2, 3];
        var arrayName = declaration.id.name;
        var elements = declaration.init.elements;

        traverseArrayElements(elements, arrayName);
        injectAfter(declaration, body, index, 'variable');
      }
      else if (declarationType === 'MemberExpression') { // ie var x = obj.name;
        var memberName = inject.traverseMemberExpression(declaration.init);

        injectAfter(declaration, body, index, 'variable', memberName);
      } 
      else if (declarationType === 'CallExpression') {
        var callee = declaration.init.callee;
        traverseArguments(declaration.init.arguments);
        injectAfter(declaration, body, index, 'variable');
      }
      else { 
        injectAfter(declaration, body, index, 'variable'); // ie var x = 12;
      }
    }
  }
}


var checkExpressionStatements = function (node, body, index, advance) {
  if (node.type === 'ExpressionStatement' && inject.isNotInjectedFunction(node)) {

    if (node.expression.type === 'UpdateExpression') { // ie x++;
      injectAfter(node, body, index, 'expression');
      advance(1);
    } 
    else if (node.expression.type === 'CallExpression') {
      // if (node.expression.callee) {
      //   injectAfter(node, body, index, 'call');
      //   advance(1);
      // }
    } 
    else if (node.expression.type === 'AssignmentExpression') {
      var left = node.expression.left;
      var right = node.expression.right;

      if (right.type === 'ObjectExpression') {
        traverseObjectProperties(right.properties, left.name);
      }
      else if (right.type === 'ArrayExpression') {
        traverseArrayElements(right.elements, left.name);
      }
      else if (right.type === 'FunctionExpression') {
        if (node.expression.left.object) {
          var name = inject.traverseMemberExpression(node.expression.left);
        } else { 
          var name = node.expression.left.name;
        }
        traverseFunction(node.expression.right, name);
      }

      if (left.type === 'MemberExpression') {
        injectAfter(node, body, index, 'memberExpression');
        advance(1);
      } else {
        injectAfter(node, body, index, 'expression');
        advance(1);
      }
    }
  }

}


var traverse = function (body) {
  var advance = function (n) { index += n; }

  for (var index = 0; index < body.length; index++) {
    var node = body[index];

    if (node) {
      
      checkVariableDeclarations(node, body, index, advance);
      checkExpressionStatements(node, body, index, advance);

      if (node.type === 'ReturnStatement') {
        if (node.argument && node.argument.type === 'FunctionExpression') {
          traverseFunction(node.argument);
        }
        injectBefore(node, body, index, 'returnState');
        injectAfter(node, body, index, 'return');

        advance(2);
      }

      if (node.type === 'ForStatement') {
        injectBefore(node, body, index, 'loopInit', 'for');
        injectAfter(node, body, index, 'loopOpen', 'for');
        var loopCloseNode = injectAfter(node, body, index + 2, 'loopClose', 'for');
        inject.changeLineArgument(loopCloseNode, node.loc.end.line);

        var loopPostNode = injectAfter(node, body, index + 3, 'loopPost', 'for');
        inject.changeLineArgument(loopPostNode, node.loc.end.line);

        advance(4);
      }

      if (node.type === 'WhileStatement') {
        injectBefore(node, body, index, 'loopOpen', 'while');
        var loopCloseNode = injectAfter(node, body, index + 1, 'loopClose', 'while');
        inject.changeLineArgument(loopCloseNode, node.loc.end.line);
        advance(2);
      }

      if (node.type === 'DoWhileStatement') {
        injectBefore(node, body, index, 'loopOpen', 'do');
        var loopCloseNode = injectAfter(node, body, index + 1, 'loopClose', 'do');
        inject.changeLineArgument(loopCloseNode, node.loc.end.line);

        advance(2)
      }

      // Traverse loop bodies
      if (node.body) {
        var block = node.body;
        traverse(block.body);
      }

      if (node.type === 'IfStatement') { 
        injectBefore(node, body, index, 'ifOpen', 'do');
    
        var ifCloseNode = injectAfter(node, body, index + 1, 'ifClose', 'do');
        inject.changeLineArgument(ifCloseNode, node.loc.end.line);
        
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
    }   
  }
}


var traverseWrappedArray = function (arrayNode, arrayName) {
  for (var index = 0; index < arrayNode.elements.length; index++) {
    var element = arrayNode.elements[index]; 
    var keyName = arrayName + '[' + index + ']'; 

    if (element.type === 'FunctionExpression') {
      traverseFunction(element, keyName);
    }
  }
}

var traverseWrappedObject = function (objectNode, objectName) {
  for (var index = 0; index < objectNode.properties.length; index++) {
    var property = objectNode.properties[index];
    var keyName = objectName + '[' + property.key.name + ']';

    if (property.value.type === 'FunctionExpression') {
      traverseFunction(property.value, keyName);
    }
  }  
}


var traverseWrappedCollection = function (collectionNode, collectionName) {
  if (collectionNode.type === 'ArrayExpression') {
    traverseWrappedArray(collectionNode, collectionName)
  } else if (collectionNode.type === 'ObjectExpression') {
    traverseWrappedObject(collectionNode, collectionName)
  }
}



var injectObjectWrappers = function (body) {
  for (var index = 0; index < body.length; index++) {
    var node = body[index];

    if (node) {

      if (node.type === 'VariableDeclaration') {
        for (var i = 0; i < node.declarations.length; i++) {
          var declaration = node.declarations[i];
          var objectNode = declaration.init;
          declaration.init = injectObjectWrapper(objectNode);
        }
      } 
      if (node.type === 'ExpressionStatement') {
        if (node.expression.type === 'AssignmentExpression') {
          if (node.expression.right) {
            var objectNode = node.expression.right;
            node.expression.right = injectObjectWrapper(objectNode);
          }
        } else if (node.expression.type === 'CallExpression') {
          injectObjectWrappers(node.expression.arguments);
        }
      }

      if (node.type === 'Property') {
        var objectNode = node.value;
        node.value = injectObjectWrapper(node.value);
      }


      if (node.type === 'ObjectExpression') {
        injectObjectWrappers(node.properties);
        body.splice(index, 1, wrapObjectInstantiation(node) );
      } else if (node.type === 'ArrayExpression') {
        injectObjectWrappers(node.elements);
        body.splice(index, 1, wrapObjectInstantiation(node) );
      } else if (node.type === 'FunctionExpression') {
        injectObjectWrappers(node.body);
        body.splice(index, 1, wrapFunctionInstantiation(node) );
      } 
    }

  }
}

var injectObjectWrapper = function (node) {
  if (node) {
    if (node.type === 'ObjectExpression') {
      injectObjectWrappers(node.properties);
      return wrapObjectInstantiation(node);
    } else if (node.type === 'ArrayExpression') {
      injectObjectWrappers(node.elements);
      return wrapObjectInstantiation(node);
    } else if (node.type === 'FunctionExpression') {
      if (node.body.body) {
        injectObjectWrappers(node.body.body)
      } else {
        injectObjectWrappers(node.body);
      }
      return wrapFunctionInstantiation(node);
    } else if (node.type === 'CallExpression') {
      injectObjectWrappers(node.arguments);
      injectObjectWrapper(node.callee.object);
    } else if (node.type === 'MemberExpression') {
      injectObjectWrappers(node)
    }
  }
  return node;
}


var wrapFunctionInstantiation = function (functionNode) {
  var wrappedNode = wrapNode(functionNode, '___fn');
  return wrappedNode;
}

var wrapObjectInstantiation = function (objectNode) {
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

var isSpecialMethod = function (method) {
  var specialMethods = ['___obj', '___fn'];
  return specialMethods.indexOf(method) !== -1;
}



module.exports = Parser;