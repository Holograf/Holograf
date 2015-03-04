/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var TabbedArea = require('react-bootstrap/TabbedArea');
var TabPane = require('react-bootstrap/TabPane');
var CodeEditor = require('./CodeEditor');
var Visual3D = require('./Visual3D.js');
var Instructions = require('./Instructions.js');
var Team = require('./Team.js');
var addons = require('react-addons');
var Loader = require('./Loader');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Button = require('react-bootstrap/Button');
var Modal = require('react-bootstrap/Modal');
var Actions = require('../actions/Actions');


module.exports = React.createClass({

  mixins: [OverlayMixin],

  handleSelect: function (selectedTab) {
    Actions.selectTab(selectedTab);
  },

  render: function() {

    return (
      <div className="appContainer" >
        <div className="navbar-brand">HOLOGRAF</div>
        <TabbedArea defaultActiveKey={1} activeKey={this.props.selectedTab} onSelect={this.handleSelect}>
          <TabPane className="tab1" eventKey={1} tab="Code">
            <CodeEditor {...this.props} />
          </TabPane>
          <TabPane className="tab2" eventKey={2} tab="3D Visualization">
            <Visual3D data={this.props.data} compiledStatus={this.props.compiledStatus} />
          </TabPane>
          <TabPane className="tab3" eventKey={3} tab="Instructions">
            <Instructions />
          </TabPane>
          <TabPane className="tab4" eventKey={4} tab="Team">
            <Team />
          </TabPane>

        </TabbedArea>
      </div>
      
    );
  },

  renderOverlay: function () {
    if (!this.props.isLoading) {
      return <span/>;
    }

    return (
        <Modal bsStyle="modal-sm" title="Rendering..." animate={false}>
          <div className="modal-body">
            <Loader {...this.props} />
          </div>
        </Modal>
      );
  }
});

