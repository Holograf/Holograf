/**
 * @jsx React.DOM
 */

var React = require('react');
var Actions = require('../actions/Actions');
var Traverse = require('../compiler/Traverse');
var CodeSnippet = require('./CodeSnippet');
var CodeHeadline = require('./CodeHeadline');


var constructBlueprintTree = function (blueprint) {
  var Leaf = function (id, parent) {
    this.id = id;
    this.parent = parent;
    this.children = [];
    this.getNode = function () {
      return blueprint[this.id];
    }
  }

  var tree = new Leaf(0);
  var topTree = tree;

  for (var i = 1; i < blueprint.length; i++) {
    var node = blueprint[i];
    
    while (tree.id !== node.___parentId) {
      tree = tree.parent;
    }
    var leaf = new Leaf(node.___id, tree);
    tree.children.push(leaf);
    tree = leaf;
  }

  return topTree;
}

module.exports = React.createClass({

  render: function() {
    var code = this.props.data.code;
    var highlight = this.props.highlight;

    // var codeTree = this.generateCodeTree();
    var blueprint = this.props.data.blueprint;
    if (blueprint) {
      var  blueprintTree = constructBlueprintTree(blueprint);
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