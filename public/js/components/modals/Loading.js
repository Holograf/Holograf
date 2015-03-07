/**
 * @jsx React.DOM
 */

 var React = require('react');
 var Modal = require('react-bootstrap/Modal');
 var Loader = require('./LoadingAnimation');

module.exports = React.createClass({

  render: function() {

    return (
      <Modal title="Rendering...">
        <div className="modal-body">
          <Loader {...this.props} />
        </div>
      </Modal>
    );
  }
});




