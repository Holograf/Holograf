var utils = require('../utils');


var Select = function (input) {
  theatre = input;
  return select;
};

var select = {};
var theatre;

var checkTheatre = function () {
  if (!theatre.expanded) theatre.expand();
  utils.dull(theatre.composite);

  if (theatre.viewIndex === undefined) {
    theatre.viewIndex = -1;
  }
}

var selectNode = function (index) {
  var composite = theatre.composite;
  theatre.currentNode = composite.children[index];
  theatre.viewIndex = index;

  utils.shine(composite, theatre.currentNode.componentData.id);
  theatre.view(theatre.currentNode.position);
}

select.next = function() {
  var composite = theatre.composite;
  checkTheatre();

  for (var index = theatre.viewIndex + 1; index < composite.children.length; index++) {
    var component = composite.children[index].componentData;
    if (component.primary) {
      break;
    }
  }

  if (index >= composite.children.length) {
    for (var index = 0; index < composite.children.length; index++) {
      var component = composite.children[index].componentData;
      if (component.primary) {
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
    var component = composite.children[index].componentData;
    if (component.primary) {
      break;
    }
  }

  if (index < 0) {
    for (var index = composite.children.length - 1; index >= 0; index--) {
      var component = composite.children[index].componentData;
      if (component.primary) {
        break;
      }
    }
  }

  selectNode(index);
};

module.exports = Select;