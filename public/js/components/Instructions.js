/**
 * @jsx React.DOM
 */

// Instructions.js
var React = require('react');
var Button = require('react-bootstrap/Button');
var Actions = require('../actions/Actions');


module.exports = React.createClass({

  render: function() {

    return (
      <div className="instructions">
        <h1>How to use Holograf</h1>
        <h2>Holograf your code</h2>
        <ol>
          <li>Enter your source code into the code viewer in the code tab</li>
          <li>Press compile to visualize your program</li>
        </ol>
        <h2>Controls</h2>
        <ul>
          <li>Right arrow - Step forward through program</li>
          <li>Left arrow - Step backward through program</li>
          <li>Down arrow - Reset view of program</li>
          <li>Space - Expand and collapse structures</li>
          <li>Return/Enter - Pause timeline particle</li>
          <li>Click and drag on an empty area to rotate the view</li>
          <li>Click on elements to examine them</li>
          <li>Scroll to zoom in and out</li>
          <li>Mouseover variables to see values</li>
          <li>Use the share button to share your Holograf!</li>
        </ul>
        <h2>Examples</h2>
        <ul>
          <li><a href="http://holograf.io/#/code/54fe67daf2f6dff21be94bf8">Range Sum</a></li>
          <li><a href="http://holograf.io/#/code/54fe7b65f2f6dff21be94bf9">Compose</a></li>
          <li><a href="http://holograf.io/#/code/54fe62d9f2f6dff21be94bf7">Binary Search</a></li>
        </ul>
      </div>
    );
  }
});

