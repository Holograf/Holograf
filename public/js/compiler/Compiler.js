var lint = require('./Linter');
var parse = require('./Parser');
var blueprint = require('./Blueprint');
var wrap = require('./Wrapper');
var generateCode = require('./Generator');
var execute = require('./Execute');
var postProcess = require('./PostProcessor');
var Promise = require('bluebird');

var Compiler = function (rawCode) {

  return new Promise (function (resolve, reject) {

    lint(rawCode)
      .then(blueprint)
      .then(parse)
      .then(wrap)
      .then(generateCode)
      .then(execute)
      .then(postProcess)
      .then(function (resolution) {

        var data = resolution.data;
        data.code = rawCode;

        // console.log(data);

        resolve(data);
      })
      .error(function (e) {
        reject(e);
      });
  })

}

module.exports = Compiler;

