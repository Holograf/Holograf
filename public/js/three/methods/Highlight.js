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

  showHighlight(node);

  for (var i=0; i < composite.children.length; i++) {
    var timelineElement = composite.children[i].data;
    if (timelineElement.id === id) {
      Highlight.siblings(node, composite.children[i]);
    }
  }
};


Highlight.siblings = function (node, sibling) {
  if (node.data.if === 'open' || node.data.if === 'close') {
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