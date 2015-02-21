var parse = require('./Parser');
var generateCode = require('escodegen').generate;
var execute = require('./Execute');

var Compiler = function (code) {

  var parsedSyntaxTree = parse(code);

  // console.log(JSON.stringify(parsedSyntaxTree, null, 1));

  var wrappedCode = generateCode(parsedSyntaxTree);
  var data = execute(wrappedCode);

  // console.log(wrappedCode);
  // console.log(JSON.stringify(data,null,1));

  return data;
}


// External variable to help manage tracking of function invocations
var functionStack = [];


module.exports = Compiler;

