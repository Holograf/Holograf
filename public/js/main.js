/**
 * @jsx React.DOM
 */

$(document).ready(function() {

  var React = require('react');
  var App = require('./App.js');
  require('codemirror/mode/javascript/javascript');

  React.render(
    <App />,
    document.getElementById('App')
  );

  
});
