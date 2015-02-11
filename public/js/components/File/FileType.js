/**
 * @jsx React.DOM
 */

var React = require('react');
var fileUtil = require('../../utils/fileUtil.js');

module.exports = React.createClass({

  render: function() {
    var file = this.props.file;

    return (
      <td> { fileUtil.fileType(file) } </td>
    );

  }

});



