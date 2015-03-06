var createWorker = require('webworkify');
var Promise = require('bluebird');

module.exports = function (rawCode) {

  return new Promise (function (resolve, reject) {
    var worker = createWorker(require('./workers/rawCodeWorker.js'));
    
    // add a listener for errors from the Worker
    worker.addEventListener('error', function(e){
      console.log('ERROR: Line ' + e.lineno + ': ' + e.message);
      reject(e);
    });
    
    worker.addEventListener('message', function(message) {
      clearTimeout(executionTimeCheck);
      resolve(rawCode);
    })
    
    // Put a timeout on the worker to automatically kill the worker
    var executionTimeCheck = setTimeout(function(){
      worker.terminate();
      reject({
        message: 'Execution timed out'
      });
      worker = null;
    }, 3000);

    worker.postMessage(rawCode);
  });

}


