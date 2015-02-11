/**
 * @jsx React.DOM
 */

var React = require('react');
var Actions = require('../../actions/Actions');

module.exports = React.createClass({

  handleClick: function(event) {
    event.preventDefault();
    var newLevel = this.props.levels.slice(0, this.props.index + 1);
    Actions.updateLevels(newLevel, this.props.cloudService);
  },

  render: function() {

    var index = this.props.index;
    var levels = this.props.levels;
    var level = this.props.level

    var className = (index === levels.length - 1) ? 'active' : '';
    var content = (index !== levels.length - 1) ? 
      <a href={'#'} onClick={this.handleClick}> {level} </a> :
      <span>{level}</span>;

    return (
        <li className={className}> 
        {content}
        </li>
    );
  }

});