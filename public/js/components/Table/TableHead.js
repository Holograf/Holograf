/**
 * @jsx React.DOM
 */

var React = require('react');
var Table = require('react-bootstrap/Table');

module.exports = React.createClass({

  render: function() {
    return (
      <thead>
        <tr>
          <th>Name</th>
          <th>Kind</th>
          <th>Size</th>
          <th>Modified</th>
        </tr>
      </thead>
    );
  }

});


