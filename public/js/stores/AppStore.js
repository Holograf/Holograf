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

var _code, _data, _shareUrl, _compiledStatus, _selectedTab, _isLoading;
var templateCode = 
'var s = function(a) {\n'+
'  a();\n'+
'};\n'+
'var q = function () {\n'+
'  var x = 1;\n'+
'  for (var i = 0; i< 5; i++) {\n'+
'    x++;\n'+
'  }\n'+
'};\n'+
'var r = q;\n'+
's(r);';

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
      isLoading: _isLoading
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
    _isLoading = true;
    AppStore.emitChange();

    _data = compile(_code);
    _compiledStatus = true;

    setTimeout(function() {
      AppStore.renderScene();
    }, 500);
  },

  renderScene: function () {
    theatre.display(_data, this.compileEnd);
  },

  compileEnd : function() {
    setTimeout(function() {
      console.log('done!')
      _isLoading = false;
      _selectedTab = 2;
      AppStore.emitChange();
    }, 1000);
  },

  updateShareUrl : function(shareUrl) {
    _shareUrl = shareUrl;
    AppStore.emitChange();
  },

  selectTab: function(tab) {
    _selectedTab = tab;
    AppStore.emitChange();
  },

  // getCode: function() {
  //   return _code;
  // },

  // getData: function() {       
  //   return _data;
  // },

  // getShareUrl: function() {
  //   return _shareUrl;
  // },

  // getProgramStep: function(n) {
  //   if (_data) {
  //     return _data.buildStep(n);
  //   },
  
  // getCompiledStatus: function() {
  //   return _compiledStatus;
  // },

  // getProgramStep: function(n) {
  //   if (_data) {
  //     return _data.buildStep(n);
  //   }
  // },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  }, 
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  // Not using because still can't detect when data has gone done
  emitCompile: function() {
    this.emit(COMPILE_EVENT);
  },
  addCompileListener: function(callback) {
    this.on(COMPILE_EVENT, callback);
  },
  removeCompileListener: function(callback) {
    this.removeListener(COMPILE_EVENT, callback);
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
    }

    return true;
  })

});

module.exports = AppStore;
