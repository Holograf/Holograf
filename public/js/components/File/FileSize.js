/**
 * @jsx React.DOM
 */

var React = require('react');
var fileUtil = require('../../utils/fileUtil.js');

module.exports = React.createClass({

  render: function() {
    var file = this.props.file;
    var size = fileUtil.fileSize(file);

    if (size) {
      return (
        <td>{ size }</td>
      );
    } else {
      return (
        <td> --- </td>
      ); 
    }
  }

});
