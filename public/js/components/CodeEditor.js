/**
 * @jsx React.DOM
 */

var React = require('react');
var addons = require('react/addons');
var Panel = require('react-bootstrap/Panel');
var CodeMirror = require('./CodeMirror/');
var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var Col = require('react-bootstrap/Col');
var Actions = require('../actions/Actions');
// var $ = require('jquery');

module.exports = React.createClass({

  options: {
    textAreaClassName: ['form-control'],
    textAreaStyle: {minHeight: '10em'},
    value: '',
    mode: 'javascript',
    theme: 'blackboard',
    lineNumbers: true,
    onChange: function (e) {
      Actions.updateCode(e.target.value);
    }
  },

  compile: function (e) {
    // console.log('this.props:',this.props);
    if (this.props.compiledStatus) {
      theatre.renderer.domElement.addEventListener('dblclick', null, false); //remove listener to render
      window.addEventListener( 'mousemove', null, false );
      window.addEventListener( 'resize', null, false );
      window.addEventListener( 'mouseup', null, false);
      window.addEventListener( 'keydown', null, false );
    }
      // theatre.removeScene();


    Actions.compile();
  },

  save: function () {
    // To add processed code use: processedCode: JSON.stringify(this.props.data)};
    var data = {rawCode: this.props.code, processedCode: 'processedCode'};
    Actions.updateUrl(data);
  },

  refresh: function() {
    history.go(0);
  },

// bsStyle options: ["default","primary","success","info","warning","danger","link","inline","tabs","pills"]. 
  render: function () {
    // dynamic classes for the buttons
    var cx = React.addons.classSet; 
    var compileClasses = cx({
      'pull-right': true,
      'codeButton': true  //,
      // 'disabled': this.props.compiledStatus
    });
    var resetClasses = cx({
      'pull-right': true,
      'codeButton': true,
      'hidden': !this.props.compiledStatus
    });
    var shareClasses = cx({
      'disabled': !this.props.compiledStatus
    });

    // Update the status of the code displayed with what is in the Store
    this.options.value = this.props.code;

    // Remove interaction with the code once it has been compiled
    // if (this.props.compiledStatus) {
    //   delete this.options.onChange;
    //   this.options.readOnly = true;
    //   // $(".codeBox").css("color", "gray");
    // };


    return (
      <div className="codeContainer">
        <CodeMirror {...this.options} className="codeBox"/>

        <Panel>
          <Button bsStyle="primary" onClick={this.compile} className={compileClasses} >Compile</Button>
          <Button bsStyle="danger" onClick={this.refresh} className={resetClasses} >Reset Code</Button>
          <Col xs={6} md={4}><Input readOnly type="text" value={this.props.shareUrl} buttonBefore={<Button onClick={this.save} className={shareClasses}>Share</Button>} /></Col>
        </Panel>
      </div>
    );
  }
});

