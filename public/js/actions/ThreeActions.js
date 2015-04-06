// app-actions.js
var AppDispatcher = require('../dispatcher/appDispatcher.js');
var AppConstants = require('../constants/appConstants.js');

var ThreeActions = {

  updateSelection: function (selection) {
    AppDispatcher.handleThreeAction({
      actionType: AppConstants.UPDATE_SELECTION,
      selection: selection
    })
  },

  updateHover: function (hover) {
    AppDispatcher.handleThreeAction({
      actionType: AppConstants.UPDATE_HOVER,
      hover: hover
    })
  }

};

module.exports = ThreeActions;
