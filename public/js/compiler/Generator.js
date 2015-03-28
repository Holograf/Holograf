var generateCode = require('escodegen').generate;
var Promise = require('bluebird');

var Generator = function (wrappedSyntaxTree) {

  return new Promise (function (resolve, reject) {
    try {
      // wrappedSyntaxTree.body.splice(1,1);
      // wrappedSyntaxTree = wrappedSyntaxTree.body[0].declarations[0].init.callee.object;
      // var node = wrappedSyntaxTree.body.body[2];
      // var st = {
      //   type: "Program",
      //   body: [node]
      // }
      // console.log('wrapped', wrappedSyntaxTree);
      var generatedCode = generateCode(wrappedSyntaxTree);
      console.log(generatedCode);

      resolve({
        code: generatedCode,
        syntaxTree: wrappedSyntaxTree
      });
    } catch (error) {
      console.error(error);
      error.message = 'Something went wrong while generating wrapped code...';
      reject(error);
    }
  });

}


module.exports = Generator;