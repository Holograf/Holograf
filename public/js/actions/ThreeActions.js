// app-actions.js
var AppDispatcher = require('../dispatcher/appDispatcher.js');
var AppConstants = require('../constants/appConstants.js');

var ThreeActions = {

  updateHighlight: function (highlight, hover) {
    AppDispatcher.handleThreeAction({
      actionType: AppConstants.UPDATE_HIGHLIGHT,
      highlight: highlight,
      hover: hover
    })
  }

};

module.exports = ThreeActions;
