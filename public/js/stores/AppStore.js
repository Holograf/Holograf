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

var _code, _data, _shareUrl, _compiledStatus, _tabKey;


var AppStore = assign({}, EventEmitter.prototype, {

  initialize: function() {
    _code = '';
    _data = [];
    _shareUrl = '';
    _compiledStatus = false;
    _tabKey = 1;
  },

  getState: function() {
    return ({
      code: _code,
      data: _data,
      compiledStatus: _compiledStatus,
      shareUrl: _shareUrl,
      tabKey: _tabKey
    });
  },

  updateCode : function(code) {
    _code = code;
  },

  compileCode : function() {
    _data = compile(_code);
    _compiledStatus = true;
    _tabKey = 2;
    var timeline = utils.parseTimeline(_data.programSteps, _data.components);
    displayScene(timeline);
    // displayScene(_data);
  },

  updateShareUrl : function(shareUrl) {
    _shareUrl = shareUrl;
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
    }

    AppStore.emitChange();
    return true;
  })

});

module.exports = AppStore;
