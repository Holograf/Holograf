/**
 * @jsx React.DOM
 */

var React = require('react');
var Actions = require('../actions/Actions');
var Traverse = require('../compiler/Traverse');
var CodeSnippet = require('./CodeSnippet');
var CodeHighlight = require('./CodeHighlight');
var CodeHeadline = require('./CodeHeadline');
var Highlight = require('./utils/Highlight');

module.exports = React.createClass({

  render: function() {
    var code = this.props.data.code;
    var highlight = this.props.highlight;

    // var codeTree = this.generateCodeTree();
    if (this.props.data.blueprint) {
      var blueprint = this.props.data.blueprint;
    } else {
      var blueprintTree = {children : []}
    }

    return (
      <div className="code-overlay">
        <div className="code-highlight">
          <span className="code-lines">
            <CodeHeadline highlight={highlight} />
            <CodeHighlight blueprint={blueprint} code={code} highlight={highlight}/>
          </span>
        </div>
      </div>
    );
  }

});