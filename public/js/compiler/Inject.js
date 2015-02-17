module.exports = {

  variable: function (node) {
    var name = node.declarations[0].id.name;
    return this.createNode('set', name);
  },

  expression: function (node) {
    var expression = node.expression;
    if (expression.type === 'UpdateExpression') {

      var name = expression.argument.name;
      return this.createNode('set', name);

    } else if (expression.type === 'AssignmentExpression') {

      var name = expression.left.name;
      return this.createNode('set', name);
    }
  },

  function: function (node) {
    var name = node.declarations[0].id.name;

    return this.createNode('function', name);    
  },

  forLoopInit: function (node, type) {

    var name = node.init.declarations[0].id.name;
    var value = node.init.declarations[0].init.value;

    return this.createNode('set', name, value);
  },

  loopOpen: function (node, type) {
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

  loopClose: function (node, type) {
    return this.createNode('loop', type, 'close');
  },

  loopSet: function (node, type) {
    var name = node.init.declarations[0].id.name;
    var injectedNode = this.createNode('set', name);

    return injectedNode;
  },


  ifStart: function (node) {
    var paths = 0;

    var traverse = function(node) {
      if (node.consequent) {
        var injectionPoint = node.consequent;
      } else {
        var injectionPoint = node;
      }
      var injectedNode = this.createNode('enter', 'if', paths);
      injectionPoint.body.unshift(injectedNode);
      paths++;

      if (node.alternate) {
        traverse(node.alternate);
      }
    }.bind(this)

    traverse(node);

    return this.createNode('block', 'if', paths);
  },

  ifEnd: function (node) {
    return this.createNode('block', 'if', 'close');
  },

  invoke: function (node, name, params) {
    var injectionPoint = node.body;

    for (var i = params.length - 1; i >= 0; i--) {
      var injectedNode = this.createNode('param', params[i].name)
      injectionPoint.unshift(injectedNode);
    }

    var injectedNode = this.createNode('invoke', name);
    injectionPoint.unshift(injectedNode);


    var injectedNode = this.createNode('return', name);
    injectionPoint.push(injectedNode);
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

  createNode: function (method, name, value) {
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
            "name": method
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

    if (args.length === 1) {
      if (method === 'set' || method === 'function' || method === 'param') {
        injectedNode.expression.arguments.push({
          "type": "Identifier",
          "name": args[0]
        })
      }
    }

    return injectedNode;
  },

  isNotInjectedFunction: function (node) {
    if (node.expression.callee) {
      return (node.expression.callee.object.name !== '___Program');
    } else {
      return true;
    }
  }

}


