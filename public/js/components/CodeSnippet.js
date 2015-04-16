/**
 * @jsx React.DOM
 */

var React = require('react');


var CodeSnippet = React.createClass({

  getCodeBetween: function (start, end) {
    var code = this.props.code;

    var substring = code.substring(start, end);
    return substring;
  },

  insertCodeBetween: function (start, end, childNodes) {
    var content = this.getCodeBetween(start, end);
    if (content.length > 0) {
      childNodes.push( <span key={childNodes.length}>{content}</span> );
    }
  },

  render: function () {
    var tree = this.props.tree;
    var code = this.props.code;
    var highlight = this.props.highlight;

    if (code) {
      var node = tree.node;
      var start = node.range[0];
      var end = node.range[1];

      var childNodes = [];
      if (tree.children.length === 0) {
        this.insertCodeBetween(start, end, childNodes)
      } 
      else {
        for (var i = 0; i < tree.children.length; i++) {
          var child = tree.children[i];
          var childNode = child.node;
          var childStart = childNode.range[0];

          if (start < childStart) {
            this.insertCodeBetween(start, childStart, childNodes);
          }

          childNodes.push( <CodeSnippet key={childNodes.length} tree={child} code={code} highlight={highlight} /> )

          start = childNode.range[1];
        }

        if (start < end) {
          this.insertCodeBetween(start, end, childNodes);
        }
      }
    }

    return (
      <span className={highlight.id === tree.id ? 'codeSnippet highlighted' : 'codeSnippet'}>
        {childNodes}
      </span>
    );
  }

});

module.exports = CodeSnippet;