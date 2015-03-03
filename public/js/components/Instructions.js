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
      <div>
        <h1>Instructions for using Holograph</h1>
        <p>Just enter your sweet code and press compile.</p>
        <p>Wait for it to complete and then switch over to the 3D Visualization page where you can see what your code looks like in three dimensions, its holograf. </p>
        <p>To share your holograf with others, click on the Share button on the Code page and copy the URL created. Anyone who visits this URL will now be able to see the visualization of your code!</p>
        <p>Rings are loops</p>
        <p>Baskets are function invocations and returns</p>
        <p>The plain, sphere-like icosahedrons are variables...</p>
        <p>Mouseover stuff to see its values</p>
        <p>Click on objects to zoom into them and see processes up close along with each item\'s values</p>
        <p>Cycle through the program's timeline by clicking Next or Previous, or by clicking the right and left arrow keys once you have clicked on an object.</p>
        <p>Use two fingers to zoom. Click and drag to rotate. Use the arrow keys to pan around the scene.</p>
        <p>Click the return button at any time to view the scene from your initial vantage point.</p>
        <p>Include images</p>
      </div>
    );
  }
});

