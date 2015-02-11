// app-actions.js
var AppDispatcher = require('../dispatcher/appDispatcher.js');
var AppConstants = require('../constants/appConstants.js');

var Actions = {

  updateCode: function(code) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.CHANGE_CODE,
      code: code
    })
  },

  compile: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.COMPILE
    })
  }

};

module.exports = Actions;
