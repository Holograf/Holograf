/**
 * @jsx React.DOM
 */

var React = require('react');
var Actions = require('../actions/Actions');
var Traverse = require('../compiler/Traverse');
var CodeSnippet = require('./CodeSnippet');
var CodeHeadline = require('./CodeHeadline');

module.exports = React.createClass({

  render: function() {
    var code = this.props.data.code;
    var highlight = this.props.highlight;

    // var codeTree = this.generateCodeTree();
    if (this.props.data.blueprint) {
      var blueprint = this.props.data.blueprint.list;
      var blueprintTree = this.props.data.blueprint.tree;
    } else {
      var blueprintTree = {children : []}
    }

    return (
      <div className="code-overlay">
        <div className="code-highlight">
          <span className="code-lines">
            <CodeHeadline highlight={highlight} />
            <CodeSnippet tree={blueprintTree} code={code} highlight={highlight}/>
          </span>
        </div>
      </div>
    );
  }

});