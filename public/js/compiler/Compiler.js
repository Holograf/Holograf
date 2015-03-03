var parse = require('./Parser');
var generateCode = require('escodegen').generate;
var execute = require('./Execute');

var Compiler = function (rawCode) {

  var wrappedSyntaxTree = parse(rawCode);

  var wrappedCode = generateCode(wrappedSyntaxTree);
  var data = execute(wrappedCode, rawCode);

  console.log(wrappedCode);
  console.log(JSON.stringify(data.programSteps,null,1));
  console.log(JSON.stringify(data.components,null,1));
  console.log(JSON.stringify(data.lines,null,1));

  return data;
}

// External variable to help manage tracking of function invocations
var functionStack = [];

module.exports = Compiler;

