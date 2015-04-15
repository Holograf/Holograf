var Promise = require('bluebird');

var scopeStack = [];
var blockStack = [];
blockStack.last = function () {
  return blockStack[blockStack.length - 1];
}

var parentObjectPosition = {};

var dx = dy = dz = 0;

var SetPositions = function (data) {
  var position = {
    x: 0,
    y: 0,
    z: 0
  }
  var blueprint = data.blueprint;

  return new Promise (function (resolve, reject) {

    data.timeline.forEach(function (timelineElement, index, timeline) {
      var nextElement = timeline[index + 1];
      update(position);
      dx = 1;
      
      //------------------------------functions and returns / scopes
      if (timelineElement.type === 'invoke') {
        if (timelineElement.return) {
          scopeStack.pop();
          position.z -= 1;

          // Iterate backwards to find the complementary invocation and reset position
          var j = index - 1;
          while (timeline[j].id !== timelineElement.id) {
            j--;
          }
          position.y = timeline[j].position.y;

        } else {
          scopeStack.push(timelineElement.id);
          dz = 1;
        }
      }

      //------------------------------conditionals
      if (timelineElement.type === 'if') {
        var paths = timelineElement.paths;
        var block = timelineElement.id;

        var height = paths - 1;
        var top = height / 2;


        //--Handle conditional branches
        if (timelineElement.branch !== undefined) {
          if (timelineElement.branch === 0) {
            position.y += top;
          } else {
            position.y -= 1;
          }
          dx = 0;
        }

        //--Handle entering a conditional branch
        else if (timelineElement.enter !== undefined) {
          position.y += height + 1;
          position.y -= timelineElement.enter;
          if (timelineElement.display.visited) {
            position.x += 1;
          }
        }
        //--Handle close of conditional branches
        else if (timelineElement.state === 'close') {
          var block = blockStack.pop();
          position.y = block.position.y;
        } 
        //--Handle open of conditional branches
        else {
          blockStack.push(timelineElement);
          dx = 0.75;
        }
      }

      if (timelineElement.type === 'array') {
        parentObjectPosition = {
          x: position.x,
          y: position.y,
          z: position.z
        }
      }

      if (timelineElement.type === 'element') {
        if (nextElement && nextElement.type === 'element') {
          dx = 0.70;
        }
      }




      timelineElement.position = {
        x: position.x,
        y: position.y,
        z: position.z
      }

      timeline[index] = timelineElement;
    });

    resolve(data);

  });

}

var update = function (position) {
  position.z += dz;
  position.y += dy;
  position.x += dx;

  dx = dy = dz = 0;
}

module.exports = SetPositions;