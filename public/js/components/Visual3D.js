/**
 * @jsx React.DOM
 */

 // Visual3D.js

var React = require('react');
// import threejs scene once it's kosher with Browserify
// var ThreeJS = require('../three/src/scene');

module.exports = React.createClass({

  componentDidMount: function() {
    // ThreeJS.displayScene(this.props.data);
    displayScene(this.props.data);
  },

  render: function() {
    return (
      <div id="three-scene" data={this.props.data} />
    );
  }
});

