/**
 * @jsx React.DOM
 */

var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var Compiler = require('../utils/Compiler')

var CHANGE_EVENT = 'change';

var _code;
var _data;

var updateCode = function(code) {
  _code = code;
}

var compileCode = function() {
  _data = Compiler.parse(_code);
  console.log(_data);
}

var AppStore = assign({}, EventEmitter.prototype, {

  initialize: function(cloudService) {
    _code = 'var y = 0;\n' +
            'for (var x = 1; x <= 3; x++) {\n' +
            '  y++;\n' +
            '}';
    _data = [];
  },

  //return an object with all of the files
  getCode: function() {
    return _code;
  },

  getData: function() {
    return _data;
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
      
      case AppConstants.CHANGE_CODE:
        updateCode(action.code);
        break;

      case AppConstants.COMPILE:
        compileCode();
        break;
    }

    AppStore.emitChange();
    return true;
  })

});

module.exports = AppStore;
