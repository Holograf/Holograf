var parse = require('esprima').parse;
var generateCode = require('escodegen').generate;

var inject = require('./Inject');
var execute = require('./Execute');


var Compiler = {
  
  parse: function (_code) {
    var parsed = parse(_code );
    var programBody = parsed.body;

    var traverse = function (container) {

      for (var index = 0; index < container.length; index++) {
        var node = container[index];

        if (node.type === 'VariableDeclaration') {
          container.splice(index + 1, 0, inject.variable(node));
          index++;
        }

        if (node.type === 'ForStatement') {
          container.splice(index, 0, inject.loopStart(node, 'for'));
          container.splice(index + 2, 0, inject.loopEnd(node, 'for'));
          index += 2;
        }

        if (node.type === 'ExpressionStatement') {
          if (inject.isNotInjectedFunction(node)) {
            container.splice(index + 1, 0, inject.expression(node) );
            index++;
          }
        }

        if (node.body) {
          var block = node.body;
          traverse(block.body);
        }
      }
    }

    traverse(programBody);

    // console.log(programBody);
    // console.log( JSON.stringify(parsed, null, 2) );
    // console.log(generate(parsed));

    var wrappedCode = generateCode(parsed);

    return execute(wrappedCode);
  }

}



module.exports = Compiler;