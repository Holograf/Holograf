// app-actions.js
var AppDispatcher = require('../dispatcher/appDispatcher.js');
var AppConstants = require('../constants/appConstants.js');

var Actions = {

  updateCode: function(code) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.UPDATE_CODE,
      code: code
    })
  },

  compile: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.COMPILE
    })
  },

  updateUrl: function (data) {
    $.ajax({
      url: 'http://127.0.0.1:5000/api/code',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        var shareUrl = 'http://127.0.0.1:5000/#/code/' + data.code;
        AppDispatcher.handleViewAction({
          actionType: AppConstants.UPDATE_SHAREURL,
          shareUrl: shareUrl
        });
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },

  fetchCode: function(id) {
    if (!id) {
      return Actions.updateCode(null);
    }
    $.ajax({
      url: 'http://127.0.0.1:5000/api/code/' + id,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        Actions.updateCode(data[0].rawCode);
        // console.log(JSON.parse(data[0].processedCode)); // TODO: Deal with this?
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  }

};

module.exports = Actions;
