
// Not a React component, but wanted add this in order to have 'require' and 'module.exports' -- @jsx React.DOM

// famous-scene.js


// This is the current problem: 
      // http://requirejs.org/docs/errors.html#mismatch
// require(['src/core/Engine', 'src/core/Surface', 'src/core/Transform', 'src/modifiers/StateModifier', '../utils/Program.js'], function (Engine, Surface, Transform, StateModifier, Program) {


// var Engine = require('./src/core/Engine');
// var Surface = require('./src/core/Surface');
// var StateModifier = require('./src/modifiers/StateModifier');
// var Transform = require('./src/core/Transform');

var Engine = famous.core.Engine;
var StateModifier = famous.core.Modifier;
var Transform = famous.core.Transform;
var Surface = famous.core.Surface;

var Famous = {
  displayScene: function( ) {
    var destElement = document.getElementById('famous-scene');
    var mainContext = Engine.createContext(destElement);

    // module.exports = 
    // var famousScene = {

    createSurface();
    createModifiedSurface();

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

  }
};
// });

module.exports = Famous;
