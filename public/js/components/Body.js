/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var InputArea = require('./InputArea');
var Graph = require('./Graph');

module.exports = React.createClass({

  render: function() {

    return (
      <div className={"row"}>
        <div className={"col-md-1"}></div>
          <Panel>
            <InputArea {...this.props} />
          </Panel>
      </div>
    );
  }
});