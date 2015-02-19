var parse = require('./Parser');
var generateCode = require('escodegen').generate;
var execute = require('./Execute');

var Compiler = function (code) {

  var parsedCode = parse(code);
  var wrappedCode = generateCode(parsedCode);
  var data = execute(wrappedCode);

  console.log(wrappedCode);
  return data;
}


// External variable to help manage tracking of function invocations
var functionStack = [];


module.exports = Compiler;