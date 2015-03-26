var utils = require('../utils');


var Select = function (input) {
  theatre = input;
  return select;
};

var select = {};
var theatre;

select.next = function() {
  var composite = theatre.composite;

  console.log(theatre);

  if (!theatre.expanded) theatre.expand();
  var foundNext = false;
  var i = 0;
  utils.dull(composite);

  if (!theatre.nodeView) {
    while (!foundNext && i < composite.children.length) {
      // Get this to move on to the next one that's primary, even if it's not the NEXT index
      if (composite.children[i].componentData.primary ) {       
        theatre.currentNode = composite.children[i];
        theatre.viewIndex = i;
        foundNext = true;
      }
      i++;
    }
  }

  i = 0;
  while (!foundNext && i < composite.children.length) {
    // Get this to move on to the next one that's primary, even if it's not the NEXT index
    if ( theatre.viewIndex < composite.children[i].componentData.timelineIndex && composite.children[i].componentData.primary ) {       
      theatre.currentNode = composite.children[i];
      theatre.viewIndex = i;
      foundNext = true;
    }
    i++;
  }
  // loop back beginning if none found after
  if (!foundNext) {
    i = 0;
    while (!foundNext && i < composite.children.length) {
      // Get this to move on to the next one that's primary, even if it's not the NEXT index
      if (composite.children[i].componentData.primary ) {       
        theatre.currentNode = composite.children[i];
        theatre.viewIndex = i;
        foundNext = true;
      }
      i++;
    }
  }
  utils.shine(composite, theatre.currentNode.componentData.id);
  theatre.view(theatre.currentNode.position);
};


select.previous = function() {
  var composite = theatre.composite;

  if (!theatre.expanded) theatre.expand();
  var foundPrev = false;
  var i = composite.children.length - 1; 
  utils.dull(composite);
  
  if (!theatre.nodeView) {
    while (!foundPrev && i >= 0) {
      if (composite.children[i].componentData.primary ) {       
        theatre.currentNode = composite.children[i];
        theatre.viewIndex = i;
        foundPrev = true;
      }
      i--;
    }
  } 

  i = composite.children.length - 1;
  while (!foundPrev && i >= 0) {
    if ( theatre.viewIndex > composite.children[i].componentData.timelineIndex && composite.children[i].componentData.primary ) {
      theatre.currentNode = composite.children[i];
      theatre.viewIndex = i;
      foundPrev = true;
    }
    i--;
  }
  // loop back beginning if none found after
  if (!foundPrev) {
    i = composite.children.length - 1;
    while (!foundPrev && i >= 0) {
      if (composite.children[i].componentData.primary ) {       
        theatre.currentNode = composite.children[i];
        theatre.viewIndex = i;
        foundPrev = true;
      }
      i--;
    }
  }

  theatre.view(theatre.currentNode.position);
  if (theatre.currentNode && theatre.currentNode.componentData.id){
    utils.shine(composite,theatre.currentNode.componentData.id);
  }

};

module.exports = Select;