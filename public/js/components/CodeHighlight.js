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

var insert = function (string, toInsert, index) {
  if (index > 0)
    return string.substring(0, index) + toInsert + string.substring(index, string.length);
  else
    return toInsert + string;
}

module.exports = CodeHighlight;