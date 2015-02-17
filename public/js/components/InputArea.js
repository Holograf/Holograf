/**
 * @jsx React.DOM
 */

var React = require('react');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var CodeEditor = require('./CodeEditor');
// var DataEditor = require('./DataEditor');
var ProgramStateView = require('./ProgramStateView');


module.exports = React.createClass({

  render: function() {

    return (
      <TabbedArea defaultActiveKey={1}>
            <TabPane eventKey={1} tab="Code">
              <CodeEditor code={this.props.code} />
            </TabPane>
            <TabPane eventKey={2} tab="View State">
              <ProgramStateView />
            </TabPane>
      </TabbedArea>
    );
  }
});