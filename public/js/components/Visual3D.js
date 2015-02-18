/**
 * @jsx React.DOM
 */

 // Visual3D.js

var React = require('react');
var Button = require('react-bootstrap/Button');

// import threejs scene once it's kosher with Browserify
// var ThreeJS = require('../three/src/scene');

module.exports = React.createClass({

  componentDidMount: function() {
    // ThreeJS.displayScene(this.props.data);
    // console.log('3D component mounted');
    // displayScene(this.props.data);       // This is already being called somehow
  },

  componentWillReceiveProps: function() {},

  pauseScene: function() {
    pause();
  },
  expandScene: function() {
    expand();
  },

  render: function() {
    // if (this.props.data.programSteps) {
    //   var timeline = utils.parseTimeline(this.props.data.programSteps, this.props.data.components);
    //   displayScene(timeline);
    // }

    return (
      <div>
        <Button className="visualButton" bsStyle="primary" onClick={this.pauseScene} >Pause</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.expandScene} >Expand</Button>
        <div id="three-scene" data={this.props.data} />
      </div>
    );
  }
});

