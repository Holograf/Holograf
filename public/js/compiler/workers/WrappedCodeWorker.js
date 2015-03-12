var WrappedCodeRunner = require('../WrappedCodeRunner');

module.exports = function (self) {
  self.addEventListener('message',function (message){
    
    var wrappedCode = message.data.code;
    var syntaxTree = message.data.syntaxTree;

    console.log(syntaxTree);

    var data = WrappedCodeRunner(wrappedCode, syntaxTree);

    postMessage(data);

  });
};