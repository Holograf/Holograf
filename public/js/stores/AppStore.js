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

var _code;
var _data;
var _shareUrl;
var _currentStep = {};
var _compiledStatus = false;
var _tabKey = 1;

var updateCode = function(code) {
  _code = code;
};

var compileCode = function() {
  _data = compile(_code);
  _compiledStatus = true;
  _tabKey = 2;
  var timeline = utils.parseTimeline(_data.programSteps, _data.components);
  displayScene(_data);
};

var updateShareUrl = function(shareUrl) {
  _shareUrl = shareUrl;
}

var AppStore = assign({}, EventEmitter.prototype, {

  initialize: function() {
    _code = "var x = 1;x++;";
    // _code = "obj = {a: 1, f: function (n) { return 1 }}";
    _data = [];
    _shareUrl = '';
  },

  getState: function() {
    return ({
      code: _code,
      data: _data,
      compiledStatus: _compiledStatus,
      tabKey: _tabKey
    });
  },

  getCode: function() {
    return _code;
  },

  getData: function() {       
    return _data;
  },

  getShareUrl: function() {
    return _shareUrl;
  },

  // getProgramStep: function(n) {
  //   if (_data) {
  //     return _data.buildStep(n);
  //   },
  
  getCompiledStatus: function() {
    return _compiledStatus;
  },

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

  dispatcherIndex: AppDispatcher.register(function(payload){

    var action = payload.action; 
    switch(action.actionType){
      
      case AppConstants.UPDATE_CODE:
        updateCode(action.code);
        break;

      case AppConstants.COMPILE:
        compileCode();
        break;

      case AppConstants.UPDATE_SHAREURL:
        updateShareUrl(action.shareUrl);
        break;
    }

    AppStore.emitChange();
    return true;
  })

});

module.exports = AppStore;
