module.exports = {

  //----------------------------------------------------------------------------------
  // Explicit Injection point methods
  variable: function (node, map) {
    var name = node.declarations[0].id.name;
    var injectedNode = this.createNode('set', name);

    var right = node.declarations[0].init;
    this.handleRightExpression(right, injectedNode);

    if (map) {
      this.addArgument(injectedNode, map);
    }

    return injectedNode;
  },

  expression: function (node) {
    var expression = node.expression;
    if (expression.type === 'UpdateExpression') {
      var name = expression.argument.name;
      return this.createNode('set', name);

    } else if (expression.type === 'AssignmentExpression') {
      var name = expression.left.name;
      var injectedNode = this.createNode('set', name);
      var right = expression.right;

      this.handleRightExpression(right, injectedNode);
      return injectedNode;
    }
  },

  function: function (node) {
    if (node.declarations) {
      var name = node.declarations[0].id.name
    } else if (node.expression) {
      var name = node.expression.left.name; 
    }
    return this.createNode('function', name);    
  },

  array: function (node, arrayMap) {
    if (node.type === 'VariableDeclaration') {
      var name = node.declarations[0].id.name;
    } else if (node.type ==='ExpressionStatement') {
      if (node.expression.left.type === 'Identifier') {
        var name = node.expression.left.name;
      } else if (node.expression.left.type === 'MemberExpression') {
        var name = this.traverseMemberExpression(node.expression.left);
        console.log('NAME', name);
      }
    }

    var injectedNode = this.createNode('array', name);  
    if (arrayMap) {
      this.addArgument(injectedNode, JSON.stringify(arrayMap));
    }
    return injectedNode;  
  },

  object: function (node, objectMap) {
    if (node.type === 'VariableDeclaration') {
      var name = node.declarations[0].id.name;
    } else if (node.type ==='ExpressionStatement') {
      if (node.expression.left.type === 'Identifier') {
        var name = node.expression.left.name;
      } else if (node.expression.left.type === 'MemberExpression') {
        var name = this.traverseMemberExpression(node.expression.left);
      }
    }


    var injectedNode = this.createNode('object', name);  
    if (objectMap) {
      this.addArgument(injectedNode, JSON.stringify(objectMap));
    }
    return injectedNode;  
  },

  //----------------------------------------------------------------------------------
  // Object injection
  traverseMemberExpression: function (object) {
    var string = '';
    var traverse = function (object) {
      if (object.property) {
        if (object.property.type === 'Literal') {
          string = '[' + object.property.value + ']' + string;
        } else {
          string = '[' + object.property.name + ']' + string;
        }
      }
      if (object.object) {
        traverse(object.object);
      } else {
        string = object.name + string;
      }
    }.bind(this);
    traverse(object);

    return string;
  },

  memberExpression: function (node) {
    var object = node.expression.left;
    var string = this.traverseMemberExpression(object);

    var injectedNode = this.createNode('setObjectProperty', string);

    var right = node.expression.right;
    this.handleRightExpression(right, injectedNode);


    return injectedNode;
  },

  setObjectAccessor: function (string) {
    string = string.replace(/\[/g, '[\'');
    string = string.replace(/\]/g, '\']');
    return string;
  },

  setParentObject: function (objectString) {
    var parentObject = objectString.substring(0, objectString.lastIndexOf('['));
    return this.setObjectAccessor(parentObject);
  },

  //----------------------------------------------------------------------------------
  // Loop Injection helper functions
  loopInit: function (node, type) {
    var name = node.init.declarations[0].id.name;
    var value = node.init.declarations[0].init.value;

    return this.createNode('set', name, value);
  },

  loopOpen: function (node, type) { // Inject ___Program.block(loop type, 'open')
                                    // as well as the 'init' (for for loops) and 'cycle'
    var injectionPoint = node.body;

    if (type === 'for') {
      // Insert a watcher on the iterator
      var name = node.init.declarations[0].id.name;
      var injectedNode = this.createNode('set', name);
      injectionPoint.body.unshift(injectedNode);

      // Inject a watcher for the loop cycle
      injectedNode = this.createNode('loop', type, 'cycle');
      injectionPoint.body.unshift(injectedNode);
    }

    if (type === 'while' || type === 'do') {
      // Inject a watcher for the loop cycle
      injectedNode = this.createNode('loop', type, 'cycle');
      injectionPoint.body.unshift(injectedNode);
    }

    return this.createNode('loop', type, 'open');
  },

  loopClose: function (node, type) { // Inject ___Program.block(loop type, 'close')
    return this.createNode('loop', type, 'close');
  },

  loopPost: function (node, type) { // Handle iterator value after loop execution
    var name = node.init.declarations[0].id.name;
    var injectedNode = this.createNode('set', name);

    return injectedNode;
  },

  //----------------------------------------------------------------------------------
  // Conditional injection
  ifOpen: function (node) { // Inject ___Program.block('if', 'open')
    var paths = 0;

    var traverse = function(node) {
      var injectionPoint = node.consequent ? node.consequent : node;
      var injectedNode = this.createNode('enter', 'if', paths++);
      injectionPoint.body.unshift(injectedNode);

      if (node.alternate) {
        traverse(node.alternate);
      }
    }.bind(this)

    traverse(node);
    return this.createNode('block', 'if', paths);
  },

  ifClose: function (node) {
    return this.createNode('block', 'if', 'close');
  },

  //----------------------------------------------------------------------------------
  // function and method internal injection
  invoke: function (node, name, params, term) {
    term = term || 'invoke';
    var injectionPoint = node.body;

    // Create the parameter watchers
    for (var i = params.length - 1; i >= 0; i--) {
      var injectedNode = this.createNode('param', params[i].name)
      injectionPoint.unshift(injectedNode);
    }
    // Inject the ___Program.invoke('fn name')
    var injectedNode = this.createNode(term, name);
    injectionPoint.unshift(injectedNode);
    // Inject teh implicit ___Program.return('fn name')
    var injectedNode = this.createNode('return', name);
    injectionPoint.push(injectedNode);
  },

  method: function (node, name, params) {
    this.invoke(node, name, params, 'method');
  },

  return: function (node, name) {
    return this.createNode('return', name);
  },

  returnState: function (node) {
    var injectedNode = {
      "type": "ExpressionStatement",
      "expression": {
        "type": "AssignmentExpression",
        "operator": "=",
        "left": {
          "type": "Identifier",
          "name": "___Program.returnState"
        },
        "right": node.argument
      }
    }
    node.argument = {
      "type": "Identifier",
      "name": "___Program.returnState"
    };
    return injectedNode;
  },

  
  //----------------------------------------------------------------------------------
  // Injection helper functions
  createNode: function (key, name, value) {
    var args = Array.prototype.slice.call(arguments, 1);

    var injectedNode = {
      "type": "ExpressionStatement",
      "expression": {
        "type": "CallExpression",
        "callee": {
          "type": "MemberExpression",
          "computed": false,
          "object": {
            "type": "Identifier",
            "name": "___Program"
          },
          "property": {
            "type": "Identifier",
            "name": key
          }
        },
        "arguments": args.map(function (arg) {
          return {
            "type": "Literal",
            "value": arg,
            "raw": JSON.stringify(arg)
          }
        })
      }
    }
    // Set second argument to be the variable itself
    if (args.length === 1) {
      if (key === 'set' || 
          key === 'function') {
        injectedNode.expression.arguments.push({
          "type": "Identifier",
          "name": args[0]
        })
      } else if (key === 'set' || 
          key === 'function' ||
          key === 'param' || 
          key === 'object' || 
          key === 'array') {
        injectedNode.expression.arguments.push({
          "type": "Identifier",
          "name": this.setObjectAccessor(args[0])
        })
      } else if (key === 'setObjectProperty') {
        injectedNode.expression.arguments.push({
          "type": "Identifier",
          "name": this.setParentObject(args[0])
        })
      }
    }
    return injectedNode;
  },

  handleRightExpression: function (right, injectedNode) {

    if (right.type === 'Identifier' && this.isNotSpecialIdentifier(right.name) ) {
      var name = this.traverseMemberExpression(right);
      this.addArgument(injectedNode, name); 
    }
    return injectedNode;
  },

  addArgument: function (node, name) {
    node.expression.arguments.push({
      "type": "Literal",
      "value": name,
      "raw": JSON.stringify(name)
    });
  },

  isNotInjectedFunction: function (node) {
    if (node.expression && node.expression.callee && node.expression.callee.object) {
      return (node.expression.callee.object.name !== '___Program');
    } else {
      return true;
    }
  },

  isNotSpecialIdentifier: function (identifier) {
    var specialIdentifiers = ['undefined', 'null'];
    return specialIdentifiers.indexOf(identifier) === -1;
  }

}




