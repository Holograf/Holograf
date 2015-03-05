var lint = require('./Linter');
var parse = require('./Parser');
var generateCode = require('./Generator');
var execute = require('./Execute');
var Promise = require('bluebird');

var Compiler = function (rawCode) {

  return new Promise (function (resolve, reject) {

    lint(rawCode)
      .then(parse)
      .then(generateCode)
      .then(execute)
      .then(function (data) {
        // console.log(data.wrappedCode);
        // console.log(JSON.stringify(data.programSteps,null,1));
        // console.log(JSON.stringify(data.components,null,1));

        data.code = rawCode;
        resolve(data);
      })
      .error(function (e) {
        reject(e);
      });
  })

}

module.exports = Compiler;

