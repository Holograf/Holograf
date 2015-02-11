/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
var InputArea = require('./InputArea');

module.exports = React.createClass({

  render: function() {

    

    return (
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <Panel>
            <InputArea {...this.props} />
          </Panel>
        </div>
      </div>
    );
  }
});