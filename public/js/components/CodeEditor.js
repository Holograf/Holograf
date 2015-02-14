/**
 * @jsx React.DOM
 */

var React = require('react');
var Panel = require('react-bootstrap/Panel');
// var Router = require('react-router');
var CodeMirror = require('./CodeMirror/');
var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var Row = require('react-bootstrap/Row');
var Col = require('react-bootstrap/Col');
var Grid = require('react-bootstrap/Grid');
var Actions = require('../actions/Actions');

module.exports = React.createClass({

  // mixins: [ Router.Navigation, Router.State ],

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
    // Actions.compile(function(data) {  // });
    deleteScene();
    Actions.compile();
  },

  // getInitialState: function () {
  //   console.log('initializing')
  //   if (this.getParams().id) {
  //     this.fetch(this.getParams().id);
  //   }
  // },

  // componentWillReceiveProps: function () {
  //   console.log('receiving props');
  //   // this.fetch(this.getParams().id); // TODO: Fix repeating call on Actions.updateCode
  // },

  save: function () {
    var data = {rawCode: this.props.code, processedCode: 'processedCode'};
    Actions.updateUrl(data);
  },

  render: function () {

    this.options.value = this.props.code;

    // <Panel className="codeMirrorPanel">        </Panel>
    return (
      <div className="codeContainer">
          <CodeMirror {...this.options} />
        <Col xs={6} md={4}><Input readOnly type="text" value={this.props.shareUrl} buttonBefore={<Button onClick={this.save} >Share</Button>} /></Col>
        <Button bsStyle="primary" className={'pull-right'} onClick={this.compile} >Compile</Button>
      </div>
    );
  }
});


