/**
 * @jsx React.DOM
 */

// TechStackItem.js
var React = require('react');

module.exports = React.createClass({

  render: function() {

    return (
      <div className="tech-stack-item">
        <a href={this.props.link} target="_blank"><img className="stack-image" src={this.props.image} alt={this.props.name} /></a>
      </div>
    );
  }
});

