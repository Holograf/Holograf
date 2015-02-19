var codeController = require('./codeController.js');

module.exports = function(app) {
  app.param('id', codeController.findId);

  app.post('/api/code', codeController.addCode);

  app.get('/api/code/:id', codeController.getCode);
};
