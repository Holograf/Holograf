module.exports = function (self) {
  self.addEventListener('message',function (message){
    var code = message.data;
// 
    eval(code);

    postMessage('complete');
  });
};