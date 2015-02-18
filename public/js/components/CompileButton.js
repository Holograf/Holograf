/**
 * @jsx React.DOM
 */

 // CompileButton.js

var React = require('react');
var addons = require('react-addons');
var Button = require('react-bootstrap/Button');
var Actions = require('../actions/Actions');

module.exports = React.createClass({

  compile: function () {
    // deleteScene();
    console.log('compiled!');
    Actions.compile();
  },

  render: function() {
    var classes = addons.classSet({
      'pull-right': true,
      'disabled': this.props.compiledStatus
    });

    return (
        <Button bsStyle="primary" onClick={this.compile} className={classes} >Compile</Button>
    );
  }
});

