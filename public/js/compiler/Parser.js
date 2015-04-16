var inject = require('./Injector');
var Promise = require('bluebird');
var Traverse = require('./Traverse');

var parse = {};
parse.invocationPoints = require('./parse/Invocation');
parse.functions = require('./parse/Function');
parse.conditionals = require('./parse/Conditionals');
parse.loops = require('./parse/Loops');
parse.expressions = require('./parse/Expressions');
parse.memberExpressions = require('./parse/MemberExpression');


// External variables to help manage tracking of function invocations
var functionStack = [];
var wrappedFunctionCount = 0;

var Parser = function (syntaxTree) {

  return new Promise (function (resolve, reject) {


    parse.invocationPoints(syntaxTree)
      .then(parse.functions)
      .then(parse.conditionals)
      .then(parse.expressions)
      .then(parse.loops)
      .then(parse.memberExpressions)
      .then(function(syntaxTree) {
        resolve(syntaxTree);
      })

  });
}


module.exports = Parser;