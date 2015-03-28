/**
 * @jsx React.DOM
 */

var React = require('react');
var headline = require('./utils/Headline');

module.exports = React.createClass({

  render: function() {

    var highlight = this.props.highlight;
    var headlineText = '';

    if (highlight.selection !== undefined) {
      var component = this.props.highlight.selection.component
      headlineText = headline.generate(component) || '';
    }
    headlineText += '\n';

    return (
      <span className="code-headline">
        {headlineText}
      </span>
    );
  }

});
