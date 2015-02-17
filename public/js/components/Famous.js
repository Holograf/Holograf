var React = require('react');
var Engine = require('../famous/src/core/Engine');
var Surface = require('../famous/src/core/Surface');


// require(['../famous/src/core/Engine', 'src/core/Surface', 'src/core/Transform', 'src/modifiers/StateModifier', '../utils/Program.js'], function (Engine, Surface, Transform, StateModifier, Program) {

var FamousScene = {};

  var mainContext = Engine.createContext();

  createSurface();
  // createModifiedSurface();

  function createSurface() {
    var surface = new Surface({
      size: [100, 100],
      content: 'surface',
      properties: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#FA5C4F'
      }
    });

    mainContext.add(surface);
  }

  function createModifiedSurface() {
    var modifiedSurface = new Surface({
      size: [true, true],
      content: 'modified surface',
      properties: {
        color: 'white',
        textAlign: 'center',
        backgroundColor: '#FA5C4F'
      }
    });
    var stateModifier = new StateModifier({
      transform: Transform.translate(150, 100, 0)
    });
    mainContext.add(stateModifier).add(modifiedSurface);
  }
});

module.exports = React.createClass({

  render: function() {
    return (

    );
  }

});