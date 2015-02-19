/**
 * @jsx React.DOM
 */

var React = require('react');
var Body = require('./components/Body');
var AppStore = require('./stores/AppStore');
var Actions = require('./actions/Actions');


var App = React.createClass({

  //get the current data from the Store
  getAppState: function() {
    return {
      code: AppStore.getCode(),
      data: AppStore.getData(),
      shareUrl: AppStore.getShareUrl(),
      // step: AppStore.getProgramStep()
    };
  },

  //this is run automatically each time a new <App /> is created
  //the object that is returned form getInitialState is set as the state of the component, accessed through this.state.variableName
  getInitialState: function() {
    AppStore.initialize();
    return this.getAppState();
  },

  //register an event listener with the store once the component has been successfully rendered/mounted on the page
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  //this is where we render the component itself, as well as any subcomponents, as well as passing in data to these subcomponents, where they will access it through this.props.variableName
  render: function() {
    return (
      <Body {...this.state} />
    );
  },

  //Event handler for 'change' events coming from the AppStore. 
  //having an _onChange function here prevents an error from popping up in the console, though it doesn't impact functionality currently
  _onChange: function() {
    this.setState(this.getAppState());
    console.log('state updated');
  }
});

module.exports = App;
