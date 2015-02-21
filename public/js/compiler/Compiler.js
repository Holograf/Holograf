var parse = require('./Parser');
var generateCode = require('escodegen').generate;
var execute = require('./Execute');

var Compiler = function (code) {

  var wrappedSyntaxTree = parse(code);

  // console.log(JSON.stringify(wrappedSyntaxTree, null, 1));

  var wrappedCode = generateCode(wrappedSyntaxTree);
  var data = execute(wrappedCode, code);

  console.log(wrappedCode);
  console.log(JSON.stringify(data,null,1));

  return data;
}


// External variable to help manage tracking of function invocations
var functionStack = [];


module.exports = Compiler;

