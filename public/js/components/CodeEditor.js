/**
 * @jsx React.DOM
 */

var React = require('react');
var addons = require('react-addons');
var Panel = require('react-bootstrap/Panel');
var CodeMirror = require('./CodeMirror/');
var Button = require('react-bootstrap/Button');
var Actions = require('../actions/Actions');

module.exports = React.createClass({

  options: {
    textAreaClassName: ['form-control'],
    textAreaStyle: {minHeight: '10em'},
    value: '',
    mode: 'javascript',
    lineNumbers: true,
    onChange: function (e) {
      Actions.updateCode(e.target.value);
    }
  },

  compile: function () {
    {this.props.tabKey}
    
    console.log('this.props:',this.props);
    Actions.compile();
  },

  refresh: function() {
    history.go(0);
  },

// bsStyle options: ["default","primary","success","info","warning","danger","link","inline","tabs","pills"]. 

  render: function () {
    // dynamic classes for the buttons
    var compileClasses = addons.classSet({
      'pull-right': true,
      'codeButton': true,
      'disabled': this.props.compiledStatus
    });
    var resetClasses = addons.classSet({
      'pull-right': true,
      'codeButton': true,
      'hidden': !this.props.compiledStatus
    });

    this.options.value = this.props.code;

    return (
      <div className="codeContainer">
          <CodeMirror {...this.options} />
          <Button bsStyle="primary" onClick={this.compile} className={compileClasses} >Compile</Button>
          <Button bsStyle="danger" onClick={this.refresh} className={resetClasses} >Reset Code</Button>
      </div>
    );
  }
});


