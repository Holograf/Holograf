/**
 * @jsx React.DOM
 */

var AppDispatcher = require('../dispatcher/appDispatcher');
var AppConstants = require('../constants/appConstants');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _code = '';
var _data = [];



var updateCode = function(code) {
  _code = code;
}

var updateData = function(data) {
  _data = data;
}

var compileCode = function() {
  var data = [];

  try {
    eval(_code);
  } catch(e) {
    var err = e.constructor('Error in Evaled Script: ' + e.message);
    // +3 because `err` has the line number of the `eval` line plus two.
    err.lineNumber = e.lineNumber - err.lineNumber + 3;
    console.log(err);
  }

  _data = data;
}

var AppStore = assign({}, EventEmitter.prototype, {

  initialize: function(cloudService) {
    _code = 'for (var x = 1; x <= 10; x++) {\n' +
           '  var y = Math.floor(Math.random() * 10);\n' +
           '  data.push([x, y]);\n' +
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

      case AppConstants.CHANGE_DATA:
        updateData(action.data);
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
