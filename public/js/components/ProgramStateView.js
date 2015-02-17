/**
 * @jsx React.DOM
 */

var React = require('react');
var Button = require('react-bootstrap/Button');
var Panel = require('react-bootstrap/Panel');
var ProgramObject = require('../Program.js');
var Thing = require('./Thing.js')
// var CodeMirror = require('./CodeMirror/');
// var Actions = require('../actions/Actions');


module.exports = React.createClass({

  // this.props should have an array of the program states

  getInitialState: function() {
    return { currentState: ProgramObject.buildState(0) };
  },

  compile: function () {
    Actions.compile();
  },

  componentDidMount: function() {
    this.programState = ProgramObject.buildState(0);
  },

  previousState: function() {
    this.setState({currentState: ProgramObject.previousState()});
    this.programState = ProgramObject.previousState();
  },

  nextState: function() {
    this.setState({currentState: ProgramObject.nextState()});
    this.programState = ProgramObject.previousState();
  },

  buildProgramState: function(index) {},

  render: function () {

    var displayThings = [];

    for (var key in this.state.currentState) {
      if (key !== 'index') {
        displayThings.push(<li><Thing {...this.state.currentState[key]} /></li>);  
      }
    }

    return (
      <div>
        <Panel>
          <ul>
            {displayThings}
          </ul>
        </Panel>
        <Button bsStyle="primary" className={'pull-left'} onClick={this.previousState} >Prev</Button>
        <Button bsStyle="primary" className={'pull-right'} onClick={this.nextState} >Next</Button>
      </div>
    );
  }
});


