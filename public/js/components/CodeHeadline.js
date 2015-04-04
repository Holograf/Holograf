/**
 * @jsx React.DOM
 */

var React = require('react');
var headline = require('./utils/Headline');

module.exports = React.createClass({

  render: function() {

    var component = this.props.highlight.component

    headlineText = headline.generate(component) || '';
    headlineText += '\n';

    return (
      <span className="code-headline">
        {headlineText}
      </span>
    );
  }

});
