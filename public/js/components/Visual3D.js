/**
 * @jsx React.DOM
 */

var React = require('react');
var addons = require('react/addons');
var Button = require('react-bootstrap/Button');
var Input = require('react-bootstrap/Input');
var Col = require('react-bootstrap/Col');
var Actions = require('../actions/Actions');
var Overlay = require('./Overlay');
var theatre = require('../three/Theatre');

module.exports = React.createClass({

  save: function () {
    Actions.updateUrl({
      rawCode: this.props.code,
      processedCode: 'processedCode'
    });
  },

  pauseScene: function() {
    theatre.pause();
  },

  expandScene: function() {
    theatre.expand();
  },

  returnCamera: function() {
    theatre.resetControls();
  },

  next: function() {
    theatre.select.next();
  },

  previous: function() {
    theatre.select.previous();
  },

  render: function() {
    return (
      <div className="visual-container">
        <div id="three-scene"></div>
        <Overlay data={this.props.data} highlight={this.props.highlight} />
        <Button className="visualButton" bsStyle="primary" onClick={this.pauseScene} >Pause</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.previous} >Previous</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.next} >Next</Button>
        <Button className="visualButton" bsStyle="primary" onClick={this.returnCamera} >Return</Button>
        <Col xs={6} md={4}><Input readOnly type="text" value={this.props.shareUrl} buttonBefore={<Button onClick={this.save} >Share</Button>} /></Col>
      </div>
    );
  }

});