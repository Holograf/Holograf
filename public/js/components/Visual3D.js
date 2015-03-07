/**
 * @jsx React.DOM
 */

 // Visual3D.js

var React = require('react');
var addons = require('react/addons');
var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var Col = require('react-bootstrap/Col');
var Actions = require('../actions/Actions');



// import threejs scene once it's kosher with Browserify
// var ThreeJS = require('../three/src/scene');

module.exports = React.createClass({

  save: function () {
    // To add processed code use: processedCode: JSON.stringify(this.props.data)};
    var data = {rawCode: this.props.code, processedCode: 'processedCode'};
    Actions.updateUrl(data);
  },
  pauseScene: function() {
    theatre.pause();
  },
  expandScene: function() {
    theatre.expand();
  },
  returnCamera: function() {
    theatre.controls.reset();
  },
  nextNode: function() {
    theatre.nextNode();
  },
  prevNode: function() {
    theatre.prevNode();
  },
  render: function() {

    // var shareClasses = React.addons.classSet({
    //   'disabled': !this.props.compiledStatus
    // });
    // className={shareClasses}

    // if (this.props.data.programSteps) {
    //   var timeline = utils.parseTimeline(this.props.data.programSteps, this.props.data.components);
    //   displayScene(timeline);
    // }
        // <Button className="visualButton" bsStyle="primary" onClick={this.expandScene} >Expand</Button>

    return (
      <div className="visual-container">
        <div id="three-scene" data={this.props.data} ></ div>
        <div id="three-modal"></div>
        <Button className="visualButton" bsStyle="primary" onClick={this.pauseScene} >Pause</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.prevNode} >Previous</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.nextNode} >Next</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.returnCamera} >Return</Button>
        <Col xs={6} md={4}><Input readOnly type="text" value={this.props.shareUrl} buttonBefore={<Button onClick={this.save} >Share</Button>} /></Col>
      </div>
    );
  }

  // _onCompile: function()  {
  //   // displayScene(this.props.data);
  //   var timeline = utils.parseTimeline(this.props.data.programSteps, this.props.data.components);
  //   displayScene(timeline);
  // }
});