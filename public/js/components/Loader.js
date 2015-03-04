/**
 * @jsx React.DOM
 */

var React = require('react');


module.exports = React.createClass({

  render: function() {

    console.log('HIDDEN?', this.props.isLoading);

    return (
      <div className={'whirlpool ' + (this.props.isLoading ? '' : 'hidden')}>
        <div className={"ring ring1" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring2" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring3" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring4" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring5" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring6" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring7" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring8" + (this.props.isLoading ? '' : 'hidden')}></div>
        <div className={"ring ring9" + (this.props.isLoading ? '' : 'hidden')}></div>
      </div>
    );
  }
});

