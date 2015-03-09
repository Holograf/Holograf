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
var About = require('./About.js');
var addons = require('react-addons');
var OverlayMixin = require('react-bootstrap/OverlayMixin');
var Button = require('react-bootstrap/Button');
var Actions = require('../actions/Actions');
var Loading = require('./modals/Loading')
var Error = require('./modals/Error');


module.exports = React.createClass({

  mixins: [OverlayMixin],

  handleSelect: function (selectedTab) {
    Actions.selectTab(selectedTab);
  },

  render: function() {
    if (this.props.selectedTab !== 2) {
      theatre.controlsEnabled = false;
      if (document.getElementById("modal-canvas")){
        document.body.removeChild(document.getElementById("modal-canvas"));
      }
      // console.log('selectedTab:', this.props.selectedTab);
    } else {            //if (this.props.compiledStatus) {
      theatre.controlsEnabled = true;
    }

    return (
      <div className="appContainer" >
        <div className="navbar-brand">HOLOGRAF</div>
        <TabbedArea defaultActiveKey={1} activeKey={this.props.selectedTab} onSelect={this.handleSelect}>
          <TabPane className="tab1" eventKey={1} tab="Code">
            <CodeEditor {...this.props} />
          </TabPane>
          <TabPane className="tab2" eventKey={2} tab="3D Visualization">
            <Visual3D {...this.props} />
          </TabPane>
          <TabPane className="tab3" eventKey={3} tab="Instructions">
            <Instructions />
          </TabPane>
          <TabPane className="tab4" eventKey={4} tab="About">
            <About />
          </TabPane>

        </TabbedArea>
      </div>
      
    );
  },

  renderOverlay: function () {

    if (this.props.error) {
      return (
        <Error error={this.props.error} />
      );
    } else if (this.props.isLoading) {
      return (
        <Loading isLoading={this.props.isLoading} />
      );
    } else {
      return <span/>;    
    }


  }
});

