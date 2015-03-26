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
var _highlight = {
  id: null,
  headline: null
}
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
      error: _error,
      highlight: _highlight
    });
  },

  getCode: function () {
    return _code;
  },

  updateCode : function(code) {
    if (code === null) {
      _code = templateCode;
    } else {
      _code = code;
    }
    AppStore.emitChange();
  },

  isCompiled: function () {
    return _compiledStatus;
  },

  isLoading: function () {
    return _isLoading;
  },

  setLoading: function (status) {
    _isLoading = status;
  },

  setCompiled: function (status) {
    _compiledStatus = status;
  },

  setData: function (data) {
    _data = data;
  },

  setError: function (error) {
    _error = error;
  },

  setSelectedTab: function (tab) {
    _selectedTab = tab;
  },

  compileCode : function() {

  },

  reset: function () {
    theatre.clearScene();

    // reset initial values
    _data = [];
    _shareUrl = '';
    _compiledStatus = false;
  },

  updateShareUrl : function(shareUrl) {
    _shareUrl = shareUrl;
    AppStore.emitChange();
  },

  updateHighlight: function(component) {
    console.log(component.codeId);
    _highlight = {
      id: component.codeId,
      component: component
    }
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

      case AppConstants.UPDATE_HIGHLIGHT:
        AppStore.updateHighlight(action.highlight);
        break;
    }

    return true;
  })

});

module.exports = AppStore;
