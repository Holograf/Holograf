/**
 * @jsx React.DOM
 */

var React = require('react');
var Table = require('react-bootstrap/Table');
var TableHead = require('./Table/TableHead.js');
var TableBody = require('./Table/TableBody.js');
var Header = require('./Table/Header.js');
var Data = require('../data/test.js');


module.exports = React.createClass({

  showFiles: function() {
    var files = this.props.files;
    var levels = this.props.levels;

    for (var i = 1; i < levels.length; i++) {
      var directory = levels[i];
      for (var j = 0; j < files.length; j++) {
        if (files[j].name === directory && files[j].meta.is_dir) {
          files = files[j].files;
          break;
        }
      }
    }
    return files;
  },

  render: function() {

    var files = this.showFiles();

    console.log(this.props.isLoading);

    return (
      <div className={'fileBrowser'}>
        <Header levels={ this.props.levels } cloudService={this.props.cloudService}/>
        <Table hover>
          <TableHead />
          <TableBody files={ files } cloudService={this.props.cloudService}/>
        </Table>
        <div className={'spinner' + (this.props.isLoading ? '' : 'hidden')}></div>
      </div>
    );
  }
});


