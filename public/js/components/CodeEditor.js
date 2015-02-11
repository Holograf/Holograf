/**
 * @jsx React.DOM
 */

var React = require('react');
var CodeMirror = require('./CodeMirror/');
var Button = require('react-bootstrap/Button');
var Actions = require('../actions/Actions');

var div = React.createFactory('div');
var h1 = React.createFactory('h1');
var p = React.createFactory('p');
var pre = React.createFactory('pre');
var code = React.createFactory('code');

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
    Actions.compile();
  },

  render: function () {

    this.options.value = this.props.code;

    return (
      <div>
        <CodeMirror {...this.options} />
        <Button bsStyle="primary" className={'pull-right'} onClick={this.compile} >Compile</Button>
      </div>
    );
  }
});


