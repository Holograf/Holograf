/**
 * @jsx React.DOM
 */

var React = require('react');
var BreadCrumb = require('./BreadCrumb');

module.exports = React.createClass({

  render: function() {

    var breadCrumbs = [];
    var cloudService = this.props.cloudService;

    this.props.levels.forEach(function(level, index, levels) {
      breadCrumbs.push(<BreadCrumb key={index} 
        level={level} 
        index={index} 
        levels={levels} 
        cloudService={cloudService}/>
      );
    });

    return (
      <ol className={'breadcrumb'}>
        {breadCrumbs}
      </ol>
    );
  }

});