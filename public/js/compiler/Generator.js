var generateCode = require('escodegen').generate;
var Promise = require('bluebird');

var Generator = function (wrappedSyntaxTree) {

  return new Promise (function (resolve, reject) {
    try {
      var generatedCode = generateCode(wrappedSyntaxTree)
      // console.log(generatedCode);
      resolve(generatedCode);
    } catch (error) {
      console.error(error);
      error.message = 'Something went wrong while generating wrapped code...';
      reject(error);
    }
  });

}


module.exports = Generator;