var highlight = require('../methods/Highlight');


var Select = function (input) {
  theatre = input;
  return select;
};

var select = {};
var theatre;

var checkTheatre = function () {
  if (!theatre.expanded) theatre.expand();
  highlight.dull(theatre.composite);

  if (theatre.viewIndex === undefined) {
    theatre.viewIndex = -1;
  }
}


var selectNode = function (index) {
  var composite = theatre.composite;
  theatre.currentNode = composite.children[index];

  theatre.viewIndex = index;

  highlight.shine(composite, theatre.currentNode);
  theatre.view(theatre.currentNode.position);
}

select.node = function (node) {
  selectNode(node.index);
}

select.next = function() {
  var composite = theatre.composite;
  checkTheatre();

  for (var index = theatre.viewIndex + 1; index < composite.children.length; index++) {
    var timelineElement = composite.children[index].data;
    if (timelineElement.primary && timelineElement.display.visited) {
      break;
    }
  }

  if (index >= composite.children.length) {
    for (var index = 0; index < composite.children.length; index++) {
      var timelineElement = composite.children[index].data;
      if (timelineElement.primary && timelineElement.display.visited) {
        break;
      }
    }
  }

  selectNode(index);
};


select.previous = function() {
  var composite = theatre.composite;
  checkTheatre();

  for (var index = theatre.viewIndex - 1; index >= 0; index--) {
    var timelineElement = composite.children[index].data;
    if (timelineElement.primary && timelineElement.display.visited) {
      break;
    }
  }

  if (index < 0) {
    for (var index = composite.children.length - 1; index >= 0; index--) {
      var timelineElement = composite.children[index].data;
      if (timelineElement.primary && timelineElement.display.visited) {
        break;
      }
    }
  }

  selectNode(index);
};

module.exports = Select;