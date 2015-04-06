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

    var tag = {};
    tag.selection = {
      start: '<span class="codeSnippet selected">',
      end: '</span>'
    }
    tag.hover = {
      start: '<span class="codeSnippet hovered">',
      end: '</span>'
    }

    if (code && highlight.selection && highlight.selection.id) {
      var selectionRange = Highlight.getRange(highlight.selection, blueprint)
      highlightedCode = insert(code, tag.selection.end, selectionRange[1]);
      highlightedCode = insert(highlightedCode, tag.selection.start, selectionRange[0]);

    } else {
      highlightedCode = code;
    }



    if (code && highlight.hover && highlight.hover.id) {
      var hoverRange = Highlight.getRange(highlight.hover, blueprint);

      if (highlightedCode.length !== code.length) {
        
        if (hoverRange[0] >= selectionRange[1]) {
          hoverRange[0] += tag.selection.end.length;
        }
        if (hoverRange[0] >= selectionRange[0]) {
          hoverRange[0] += tag.selection.start.length;
        }

        if (hoverRange[1] <= selectionRange[1]) {
          hoverRange[1] += tag.selection.start.length;
        } else if (hoverRange[1] > selectionRange[1]) {
          hoverRange[1] += tag.selection.start.length + tag.selection.end.length;
        }
      }
      highlightedCode = insert(highlightedCode, tag.hover.end, hoverRange[1]);
      highlightedCode = insert(highlightedCode, tag.hover.start, hoverRange[0]);
    }


    console.log(highlightedCode);



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