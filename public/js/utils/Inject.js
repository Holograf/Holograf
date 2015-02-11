module.exports = {

  isNotInjectedFunction: function (node) {
    if (node.expression.callee) {
      return (node.expression.callee.object.name !== '___Program');
    } else {
      return true;
    }
  },

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
      console.log(node.expression);

      var name = expression.left.name;
      return this.createNode('set', name);
    }
  },

  loopStart: function (node, type) {
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

    return this.createNode('loop', type, 'open');
  },

  loopEnd: function (node, type) {
    return this.createNode('loop', type, 'close');
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
      if (method === 'set') {
        injectedNode.expression.arguments.push({
          "type": "Identifier",
          "name": args[0]
        })
      }
    }

    return injectedNode;
  }

}


