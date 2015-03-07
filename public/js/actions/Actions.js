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

  selectTab: function(tab) {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.SELECT_TAB,
      tab: tab
    })
  },

  compile: function() {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.COMPILE
    })
  },

  updateUrl: function (data) {
    $.ajax({
      url: 'http://holograf.elasticbeanstalk.com/api/code',
      dataType: 'json',
      type: 'POST',
      data: data,
      success: function(data) {
        var shareUrl = 'http://holograf.io/#/code/' + data.code;
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
      url: 'http://holograf.elasticbeanstalk.com/api/code/' + id,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        Actions.updateCode(data[0].rawCode);
        // console.log(JSON.parse(data[0].processedCode));
      },
      error: function(xhr, status, err) {
        console.error(xhr, status, err.toString());
      }.bind(this)
    });
  },

  resetError: function () {
    AppDispatcher.handleViewAction({
      actionType: AppConstants.RESET_ERROR
    })    
  }

};

module.exports = Actions;
