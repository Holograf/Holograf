/**
 * @jsx React.DOM
 */

var React = require('react');
var TableRow = require('./TableRow.js');

module.exports = React.createClass({


    render: function() {

      var rows = [];
      var cloudService = this.props.cloudService

      this.props.files.forEach(function(file) {
        rows.push(<TableRow key={file.meta.path} file={file} cloudService={cloudService}/>);
      }.bind(this));

      return (
        <tbody>
          {rows}
        </tbody>
      );
    }

});


        