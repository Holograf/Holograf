/**
 * @jsx React.DOM
 */

var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');
var Program = require('../compiler/Program.js');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var compile = require('../compiler/Compiler')

var CHANGE_EVENT = 'change';
var COMPILE_EVENT = 'compile';

var _code, _data, _shareUrl, _compiledStatus, _selectedTab, _isLoading, _error;
var templateCode = 
'var fibonacci = function (n) {\n'+
'  if (n < 2){\n'+
'    return 1;\n'+
'  } else {\n'+
'    return fibonacci(n-2) + fibonacci(n-1);\n'+
'  }\n'+
'}\n'+
'\n'+
'fibonacci(5);\n';


var AppStore = assign({}, EventEmitter.prototype, {

  initialize: function() {
    _code = '';
    _data = [];
    _shareUrl = '';
    _compiledStatus = false;
    _selectedTab = 1;
    _isLoading = false;
  },

  getState: function() {
    return ({
      code: _code,
      data: _data,
      compiledStatus: _compiledStatus,
      shareUrl: _shareUrl,
      selectedTab: _selectedTab,
      isLoading: _isLoading,
      error: _error
    });
  },

  updateCode : function(code) {
    if (code === null) {
      _code = templateCode;
    } else {
      _code = code;
    }
    AppStore.emitChange();
  },

  compileCode : function() {

    if (_compiledStatus) {
      theatre.clearScene();

      // reset initial values
      _data = [];
      _shareUrl = '';
      _compiledStatus = false;
    }

    setTimeout(function (){
      _isLoading = true;
      AppStore.emitChange();
    }, 200);

    compile(_code)
      .then(function (data) {
        _compiledStatus = true;
        _data = data;
        AppStore.emitChange();

        setTimeout(function() {
          AppStore.renderScene();
        }, 300);
      })
      .error(function (error) {
        _error = {
          line: error.lineno,
          message: error.message
        }
        _isLoading = false;
        AppStore.emitChange();
      })
  },

  renderScene: function () {
    theatre.display(_data, this.renderEnd);
  },

  renderEnd : function() {
    setTimeout(function() {
      _isLoading = false;
      _selectedTab = 2;
      AppStore.emitChange();
    }, 300);
  },

  updateShareUrl : function(shareUrl) {
    _shareUrl = shareUrl;
    AppStore.emitChange();
  },

  selectTab: function(tab) {
    _selectedTab = tab;
    AppStore.emitChange();
  },

  resetError: function () {
    _error = null;
    _isLoading = false;
    AppStore.emitChange();
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }, 
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  

  dispatcherIndex: AppDispatcher.register(function(payload){

    var action = payload.action; 
    switch(action.actionType){
      
      case AppConstants.UPDATE_CODE:
        AppStore.updateCode(action.code);
        break;

      case AppConstants.COMPILE:
        AppStore.compileCode();
        break;

      case AppConstants.UPDATE_SHAREURL:
        AppStore.updateShareUrl(action.shareUrl);
        break;

      case AppConstants.SELECT_TAB:
        AppStore.selectTab(action.tab);
        break;

      case AppConstants.RESET_ERROR:
        AppStore.resetError();
        break;
    }

    return true;
  })

});

module.exports = AppStore;
