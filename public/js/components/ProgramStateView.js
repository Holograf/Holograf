/**
 * @jsx React.DOM
 */

// ProgramStateView.js

var React = require('react');
var Button = require('react-bootstrap/Button');
var Panel = require('react-bootstrap/Panel');
var Program = require('../compiler/Program.js');
var Thing = require('./Thing.js')
// var CodeMirror = require('./CodeMirror/');
// var Actions = require('../actions/Actions');

module.exports = React.createClass({

  compile: function () {
    Actions.compile();
  },

  previousStep: function() {
  },

  nextStep: function() {
  },

  render: function () {

    var displayThings = [];

    // for (var key in this.props.currentStep) {
    //   if (key !== 'index') {
    //     displayThings.push(<li><Thing {...this.state.currentStep[key]} /></li>);  
    //   }
    // }

    return (
      <div>
        <Panel>
          <ul>
            {displayThings}
          </ul>
        </Panel>
        <Button bsStyle="primary" className={'pull-left'} onClick={this.previousStep} >Prev</Button>
        <Button bsStyle="primary" className={'pull-right'} onClick={this.nextStep} >Next</Button>
      </div>
    );
  }
});


