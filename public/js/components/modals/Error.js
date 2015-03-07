/**
 * @jsx React.DOM
 */

 var React = require('react');
 var Modal = require('react-bootstrap/Modal');
 var Actions = require('../../actions/Actions');
 var Button = require('react-bootstrap/Button');
 var Alert = require('react-bootstrap/Alert');

module.exports = React.createClass({

  handleToggle: function () {
    Actions.resetError();
  },

  render: function() {

    var lineNumber = this.props.error.line ? 'Line ' + this.props.error.line + ':\n' : '';
    var errorMessage = this.props.error.message;

    return (
      <Modal bsStyle="danger" title="ERROR" onRequestHide={this.handleToggle}>
        
        <div className="modal-body">
          <h3>{lineNumber}</h3>
          <p>{errorMessage}</p>
        </div>
        <div className="modal-footer">
          <Button onClick={this.handleToggle}>Close</Button>
        </div>
      </Modal>
    );
  }
});











