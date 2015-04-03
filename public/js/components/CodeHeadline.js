/**
 * @jsx React.DOM
 */

var React = require('react');

module.exports = React.createClass({

  render: function() {

    var component = this.props.highlight.component

    headline = createHeadline(component) || '';
    headline += '\n';

    return (
      <span className="code-headline">
        {headline}
      </span>
    );
  }

});


function createHeadline (component) {
  if (component) {
    var type = component.type;
    var headline = '';

    if (type === 'var') {
      var value = getValue(component);
      return 'variable: ' + component.name + ' = ' + value;   
    } 

    else if (type === 'invoke') {
      if (component.return) {
        var value = component.return.value;
        if (typeof value === 'string') {
          value = "'" + value + "'";
        }
        if (component.return.pointsTo) {
          var value = component.return.pointsTo.type;
        }
        return 'function: ' + component.name + ' returns ' + value;
      } 
      else {
        return 'function: ' + component.name + ' invocation';
      }
    } 

    else if (type === 'param') {
      var value = getValue(component);
      return 'argument: ' + component.name + ' = ' + value;   
    }

    return headline;
  }
}

function getValue (component) {
  var value = component.value;
  if (typeof value === 'string') {
    value = "'" + value + "'";
  }
  if (component.pointsTo) {
    if (component.pointsTo.type === 'function') {
      value = 'function';
    } else if (component.pointsTo.type === 'object') {
      value = 'object';
    } else if (component.pointsTo.type === 'array') {
      value = 'array';
    } 
  }
  return value;
}





