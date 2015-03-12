var traverseFunction = function (fn) {
  var functionBody = fn.body
  var params = fn.params;

  // Inject invocation and parameter watchers inside the function body
  inject.invoke(fn, params);
  traverse(functionBody.body);
}

var traverseMethod = function (method) {
  var methodBody = method.body;
  var params = method.params;

  // Inject invocation and parameter watchers inside the function body 
  inject.method(methodBody, params);
  traverse(methodBody.body);
}

var traverseObjectProperties = function (properties) {
  for (var i = 0; i < properties.length; i++) {
    var property = properties[i];
    if (property.value.type === 'FunctionExpression') {
      traverseMethod(property.value);
    } else if (property.value.type === 'ObjectExpression') {
      traverseObjectProperties(property.value.properties);
    } else if (property.value.type === 'ArrayExpression') {
      traverseArrayElements(property.value.elements);
    }
  }
}

var traverseArrayElements = function (elements) {
  for (var index = 0; index < elements.length; index++) {
    var element = elements[index];
    if (element.type === 'FunctionExpression') {
      traverseFunction(element, '___anonymous');
    } else if (element.type === 'ObjectExpression') {
      traverseObjectProperties(element.properties);
    } else if (element.type === 'ArrayExpression') {
      traverseArrayElements(element.elements);
    } 
  }
}

var traverseArguments = function (args) {
  for (var index = 0; index < args.length; index++) {
    var arg = args[index];
    if (arg.type === 'FunctionExpression') {
      traverseFunction(arg, '___anonymous');
    } else if (arg.type === 'ObjectExpression') {
      traverseObjectProperties(arg.properties);
    } else if (arg.type === 'ArrayExpression') {
      traverseArrayElements(arg.elements);
    } 
  }
}

var injectBefore = function (node, body, index, type, param) {
  var injectedNode = inject[type](node, param);
  if (injectedNode) {
    body.splice(index, 0, injectedNode);
    if (node.loc && injectedNode.expression.arguments) {
      var codeId = node.___id;
      inject.addArgument(injectedNode, codeId);
    }
  }
  return injectedNode;
}

var injectAfter = function (node, body, index, type, param) {
  var injectedNode = inject[type](node, param);
  if (injectedNode) {
    body.splice(index + 1, 0, injectedNode);
    if (node.loc && injectedNode.expression.arguments) {
      var codeId = node.___id;
      inject.addArgument(injectedNode, codeId);
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
        traverseArguments(declaration.init.arguments);
        injectAfter(declaration, body, index, 'variable');
      }
      else { 
        injectAfter(declaration, body, index, 'variable'); // ie var x = 12;
      }
    }
  }
}

var insertInvocationPoints = function (node, body, index, advance) {
  
}


var checkExpressionStatements = function (node, body, index, advance) {
  if (node.type === 'ExpressionStatement' && inject.isNotInjectedFunction(node)) {

    if (node.expression.type === 'UpdateExpression') { // ie x++;
      injectAfter(node, body, index, 'expression');
      advance(1);
    } 
    else if (node.expression.type === 'CallExpression') {
      injectBefore(node, body, index, 'invocationPoint');
      advance(1);
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

        var parentObjectNode = inject.parentObject(node);
        var objectAccessorNode = inject.objectAccessor(node);
        var expressionStatementNode = inject.objectExpressionStatement(node, parentObjectNode, objectAccessorNode);
        var setObjectPropertyNode = inject.setObjectPropertyExpression(node, parentObjectNode, objectAccessorNode);

        injectedStatements = [parentObjectNode, objectAccessorNode, expressionStatementNode, setObjectPropertyNode];

        body.splice(index, 1);
        insertArrayAt(body, index, injectedStatements);

        console.log(body);
        advance(3);
      } else {
        injectAfter(node, body, index, 'expression');
        advance(1);
      }
    }
  }

}

function insertArrayAt(array, index, arrayToInsert) {
    Array.prototype.splice.apply(array, [index, 0].concat(arrayToInsert));
}


var traverse = function (body) {
  if (body) {
    var advance = function (n) { index += n; }

    for (var index = 0; index < body.length; index++) {
      var node = body[index];

      if (node) {
        
        checkVariableDeclarations(node, body, index, advance);
        checkExpressionStatements(node, body, index, advance);

        if (node.type === 'FunctionDeclaration') { // ie function f () { return 1; };
          traverseFunction(node);
        } 

        if (node.type === 'ReturnStatement') {
          if (node.argument && node.argument.type === 'FunctionExpression') {
            traverseFunction(node.argument);
          }
          injectBefore(node, body, index, 'returnState');
          injectAfter(node, body, index, 'return');

          advance(2);
        }

        if (node.type === 'ForStatement') {
          injectBefore(node, body, index, 'loopOpen', 'for');
          var loopCloseNode = injectAfter(node, body, index + 1, 'loopClose', 'for');
          inject.changeCodeId(loopCloseNode, node.___id);

          var loopPostNode = injectAfter(node, body, index + 2, 'loopPost', 'for');
          inject.changeCodeId(loopPostNode, node.___id);

          advance(3);
        }

        if (node.type === 'ForInStatement') {
          injectBefore(node, body, index, 'loopOpen', 'forIn');
          var loopCloseNode = injectAfter(node, body, index + 1, 'loopClose', 'forIn');
          inject.changeCodeId(loopCloseNode, node.___id);

          var loopPostNode = injectAfter(node, body, index + 2, 'loopPost', 'forIn');
          inject.changeCodeId(loopPostNode, node.___id);

          advance(3);
        }

        if (node.type === 'WhileStatement') {
          injectBefore(node, body, index, 'loopOpen', 'while');
          var loopCloseNode = injectAfter(node, body, index + 1, 'loopClose', 'while');
          inject.changeCodeId(loopCloseNode, node.___id);
          advance(2);
        }

        if (node.type === 'DoWhileStatement') {
          injectBefore(node, body, index, 'loopOpen', 'do');
          var loopCloseNode = injectAfter(node, body, index + 1, 'loopClose', 'do');
          inject.changeCodeId(loopCloseNode, node.___id);

          advance(2)
        }

        // Traverse loop bodies
        if (node.body && node.type !== 'FunctionDeclaration') {
          var block = node.body;
          traverse(block.body);
        }

        if (node.type === 'IfStatement') { 
          // Traverse if statement tree
          var traverseIf = function (node) {
            if (node.consequent) {
              if (node.consequent.body) {
                traverse(node.consequent.body);
              } else {
                node.consequent = {
                  body: [node.consequent],
                  loc: node.loc,
                  type: 'BlockStatement'
                }
                traverse(node.consequent.body);
              }
            }
            if (node.alternate) {
              if (node.alternate.body) {
                traverse(node.alternate.body);
              } else if (node.alternate.type === 'IfStatement') {
                traverseIf(node.alternate);
              } else {
                node.alternate = {
                  body: [node.alternate],
                  loc: node.loc,
                  type: 'BlockStatement'
                }
                traverse(node.alternate.body);
              }
            }
          }

          traverseIf(node);

          injectBefore(node, body, index, 'ifOpen', 'do');
      
          var ifCloseNode = injectAfter(node, body, index + 1, 'ifClose', 'do');
          inject.changeCodeId(ifCloseNode, node.___id);
          
          advance(2);
        }
      }   
    }
  }
}