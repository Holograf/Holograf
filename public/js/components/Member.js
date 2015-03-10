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
          <a className='icon' href={this.props.linkedIn} target='_blank'><img className='linkedIn-image' src='icons/linkedin.png' alt='LinkedIn profile' /></a>
          <a className='icon' href={this.props.gitHub} target='_blank'><img className='gitHub-image' src='icons/github.png' alt='GitHub profile' /></a>
          <a className='icon' href={this.props.website} target='_blank'><img className='website-image' src='icons/homepage.png' alt={this.props.name} /></a>
        </div>
      </div>
    );
  }
});

