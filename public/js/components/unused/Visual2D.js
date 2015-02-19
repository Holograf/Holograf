/**
 * @jsx React.DOM
 */

var React = require('react');
var Famous = require('../famous/famous-scene.js');
// var Button = require('react-bootstrap/Button');
// var Panel = require('react-bootstrap/Panel');
// var 2DCanvas = require('./2DCanvas.js');
// var Element2D = require('./Element2D');
// var Famous = require(./Famous.js);
// var Engine = require('../famous/src/core/Engine');
// var Surface = require('../famous/src/core/Surface');



module.exports = React.createClass({

  componentDidMount: function() {
    Famous.displayScene(); 
  },

  previousState: function() {
  },

  nextState: function() {
  },

  render: function () {
    return (
      <div id="famous-scene" data={this.props.data} />
    );
  }
});

// <2DCanvas id='raphael-canvas' {...this.props} />;