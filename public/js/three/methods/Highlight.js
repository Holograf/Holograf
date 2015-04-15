var THREE = require('three');
var TWEEN = require('tween.js');

var Highlight = {};


Highlight.dull = function (composite){
  composite.children.forEach(function( shape ) {
    if (shape.grayness){
      shape.material.color.setRGB( shape.grayness, shape.grayness, shape.grayness );
      shape.material.opacity = 0;
    }
  });
};

Highlight.shine = function (composite, node) {
  var id = node.data.id;

  console.log(id);

  showHighlight(node);

  for (var i=0; i < composite.children.length; i++) {
    var timelineElement = composite.children[i].data;
    if (timelineElement.id === id) {
      Highlight.siblings(node, composite.children[i]);
    }
  }
};


Highlight.siblings = function (node, sibling) {
  if (node.data.type === 'if'){
    if (node.data.state === 'open' || node.data.state === 'close') {
      showHighlight(sibling);
    }
  } 

  if (node.data.type === 'element') {
    showHighlight(sibling);
  }
}







module.exports = Highlight;

var showHighlight = function (node) {
  if (node.material && node.material.color) {
    node.material.color.setRGB(1,1,0);
  }

  if (node.transparent) {
    node.material.opacity = 1;
  }
}