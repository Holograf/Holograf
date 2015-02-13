var Program = require('./Program');

module.exports = function (_code) {

  var ___Program = new Program;

  try {
    eval(_code);
  } catch(e) {
    var err = e.constructor('Error in Evaled Script: ' + e.message);
    // +3 because `err` has the line number of the `eval` line plus two.
    err.lineNumber = e.lineNumber - err.lineNumber + 3;
    console.log(err);
  }

  return ___Program.getData();

}


