/**
 * @jsx React.DOM
 */

// Member.js
var React = require('react');

module.exports = React.createClass({

  render: function() {

    return (
      <div className='member'>
        <img className='profile-pic' src={this.props.image} alt={this.props.name} />
        <h3>{this.props.name}</h3>
        <div className='icons'>
          <a href={this.props.linkedIn} target='_blank'><img className='linkedIn-image' src='img/linkedIn.png' alt='LinkedIn profile' /></a>
          <a href={this.props.gitHub} target='_blank'><img className='gitHub-image' src='img/gitHub.png' alt='GitHub profile' /></a>
          <a href={this.props.website} target='_blank'><img className='website-image' src='img/website.png' alt={this.props.name} /></a>
        </div>
      </div>
    );
  }
});

