var THREE = require('three');
var TWEEN = require('tween.js');

var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');


module.exports = function(composite, component, timelineElement){
  var position = utils.checkDefaults(timelineElement.position);

  component.data = timelineElement;
  component = utils.tweenify(component, {
    x1: position.x1, 
    x2: position.x2, 

    y1: position.y1, 
    y2: position.y2, 

    z1: position.z1, 
    z2: position.z2
  } );
    
  component.position.set( position.x1, position.y1, position.z1 );
  component.index = composite.children.length;
  composite.add(component);
};

