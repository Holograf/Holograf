/**
 * @jsx React.DOM
 */

var Dispatcher = require('./dispatcher.js');
var assign = require('object-assign');

var AppDispatcher = assign({}, Dispatcher.prototype, {

  // bridge function between the views and the dispatcher
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  },

  handleThreeAction: function(action) {
    this.dispatch({
      source: 'THREE_ACTION',
      action: action
    })
  }
});

module.exports = AppDispatcher;
