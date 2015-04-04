/**
 * @jsx React.DOM
 */

var React = require('react');
var Highlight = require('./utils/Highlight');


var CodeHighlight = React.createClass({


  render: function () {
    var tree = this.props.tree;
    var code = this.props.code;
    var blueprint = this.props.blueprint;
    var highlight = this.props.highlight;

    var tag = {
      start: '<span class="codeSnippet highlighted">',
      end: '</span>'
    }

    
    if (code && highlight.id) {
      var highlightRange = Highlight.getRange(highlight, blueprint)
      highlightedCode = insert(code, tag.end, highlightRange[1]);
      highlightedCode = insert(highlightedCode, tag.start, highlightRange[0]);
    } else {
      highlightedCode = code;
    }


    return (
      <span className='codeHighlight' dangerouslySetInnerHTML={{__html: highlightedCode}}>
      </span>
    );
  }

});

var insert = function (string1, string2, index) {
  if (index > 0)
    return string1.substring(0, index) + string2 + string1.substring(index, string1.length);
  else
    return string2 + string1;
}

module.exports = CodeHighlight;