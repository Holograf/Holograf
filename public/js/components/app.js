/**
 * @jsx React.DOM
 */

var React = require('react');
var FileBrowser = require('./FileBrowser');
var AppStore = require('../stores/AppStore');
var Actions = require('../actions/Actions');


var App = React.createClass({

  //get the current data from the Store
  getAppState: function() {
    return {
      files: AppStore.getFiles(this.props.cloudService),
      levels: AppStore.getLevels(this.props.cloudService),
      isDragging: AppStore.isDragging(this.props.cloudService),
      isLoading: AppStore.isLoading(this.props.cloudService)
    };
  },

  //this is run automatically each time a new <App /> is created
  //the object that is returned form getInitialState is set as the state of the component, accessed through this.state.variableName
  getInitialState: function() {
    AppStore.initialize(this.props.cloudService)
    return this.getAppState();
  },

  //register an event listener with the store once the component has been successfully rendered/mounted on the page
  componentDidMount: function() {
    AppStore.addChangeListener(this._onChange);
    Actions.getAllFiles(this.props.cloudService);
  },

  componentWillUnmount: function() {
    AppStore.removeChangeListener(this._onChange);
  },

  //this is where we render the component itself, as well as any subcomponents, as well as passing in data to these subcomponents, where they will access it through this.props.variableName
  render: function() {
    return (
      <div>
          <FileBrowser 
          levels={this.state.levels} 
          files={this.state.files} 
          cloudService={this.props.cloudService}
          isLoading={this.state.isLoading}/>
      </div>
    );
  },

  //Event handler for 'change' events coming from the AppStore. 
  //having an _onChange function here prevents an error from popping up in the console, though it doesn't impact functionality currently
  _onChange: function() {
    this.setState(this.getAppState());
  }
});

module.exports = App;
