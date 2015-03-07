var Program = require('./Program');
var createWorker = require('webworkify');
var Promise = require('bluebird');

module.exports = function (wrappedCode) {

  return new Promise (function (resolve, reject) {

    var worker = createWorker(require('./workers/WrappedCodeWorker.js'));
    // add a listener for errors from the Worker
    worker.addEventListener('error', function(e){
      console.log('Error evaluating...')
      reject(e);
    });

    worker.addEventListener('message', function(message) {
      clearTimeout(executionTimeCheck);
      console.log(JSON.stringify(message.data.programSteps, null, 2));
      console.log(JSON.stringify(message.data.components, null, 2));
      console.log(JSON.stringify(message.data.scopes, null, 2));
      resolve(message.data);
    })

    worker.postMessage(wrappedCode);

    // Put a timeout on the worker to automatically kill the worker
    var executionTimeCheck = setTimeout(function(){
      worker.terminate();
      worker = null;
    }, 3000);

  });

}


