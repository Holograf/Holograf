/** @jsx React.DOM */
var React = require('react');
// var AppActions = require('../actions/appActions');
// var AppStore = require('../stores/appStore');


var Thing = React.createClass({

  render:function(){
    return (
      <div className='thing-container' >
        <p>id: {this.props.id}</p>
        <p>name: {this.props.name}</p>
        <p>val: {this.props.val}</p>
        <p>type: {this.props.type}</p>
        <p>scope: {this.props.scope}</p>
        <p>container: {this.props.container}</p>
        <p>createdAt: {this.props.createdAt}</p>
      </div>
    );
  }
});

module.exports = Thing;
