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



    // Naked Bootstrap with some React stuffs
    // <div className="navbar-brand">Holograf</div>
    // <ul className="nav nav-tabs" defaultActiveKey={1}>
    //   <li role="presentation" eventKey={1} className="active"><a href="#">Code</a></li>
    //   <li role="presentation" eventKey={2}><a href="#">3D Visualization</a></li>
    // </ul>


    return (
      <div className="appContainer">
        
        <div className="navbar-brand">Holograf</div>
        <TabbedArea defaultActiveKey={1}>
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
  }
});

