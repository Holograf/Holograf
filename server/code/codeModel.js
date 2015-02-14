var mongoose = require('mongoose');

var CodeSchema = new mongoose.Schema({
  rawCode: {
    type: String,
    required: true
  },
  processedCode: {
    type: String,
    required: true
  },
  settings: {
    type: String
  },
  version: {
    type: String
  }
});

module.exports = mongoose.model('Code', CodeSchema);
