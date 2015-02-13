/**
 * @jsx React.DOM
 */

var React = require('react');
var Button = require('react-bootstrap/Button');
var Actions = require('../actions/Actions');
var Input = require('react-bootstrap/Input')
module.exports = React.createClass({

  compile: function () {
    // Actions.updateData(this.);
  },

  displayData: function () {
    var data = JSON.stringify(this.props.data);
    data = data.slice(1, data.length - 1);
    data = data.split('],[').join('], [');
    
    return data;
  },

  render: function () {

    var data = this.props.data;

    return (
      <div>
        <Input className={'dataInput'} type="textarea" value={this.displayData()} />
        <Button bsStyle="primary" className={'pull-right'} onClick={this.display} >Display</Button>
      </div>
    );
  }
});


