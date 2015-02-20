/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var CodeEditor = require('./CodeEditor');
var Visual3D = require('./Visual3D.js');
var addons = require('react-addons');

module.exports = React.createClass({

  render: function() {

    // var codeClasses = addons.classSet({
    //   'active': !this.props.compiledStatus
    // });
    // className={codeClasses}
    // var visualClasses = addons.classSet({
    //   'active': this.props.compiledStatus
    // });
    // className={visualClasses}

    return (
      <div className="appContainer">
        <div className="navbar-brand">SuspiciousPi</div>
        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab="Code">
            <CodeEditor {...this.props} />
          </TabPane>
          <TabPane eventKey={2} tab="3D Visualization">
            <Visual3D data={this.props.data} compiledStatus={this.props.compiledStatus} />
          </TabPane>
        </TabbedArea>
      </div>
    );
  }
});

