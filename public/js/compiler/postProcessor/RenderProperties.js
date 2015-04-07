var RenderProperties = function (data) {

  return new Promise (function (resolve, reject) {

    data.timeline.forEach(function (element, index, timeline) {

      element.display = {
        rendered: true,
        visited: true
      };
      element.primary = true;

      //--------------------------Conditionals
      if (element.name === 'if') {
        if (element.branch !== undefined) {
          if (element.branch >= element.paths) { // Check for elements with a branch greater than the number of paths, 
                                                 // indicating the branch bypassing the if statement
            element.display.rendered = false;
            element.display.visited = false;
            element.primary = false;
          }
        } 
        
        if (element.enter !== undefined) {  // Check for a conditional enter, and parse backwards to set which conditional 
                                            // branches are visited
          if (timeline[index + 1].return === undefined) {
            element.display.visited = false;
          } else {
            element.display.visited = true;
          }

          if (element.enter >= element.paths) {
            element.display.visited = true;
          }


          element.display.rendered = false;

          var pathsVisited = element.paths;
          var j = index;
          var previousElement;

          while (pathsVisited >= 0) {
            console.log(j);
            j--;
            previousElement = timeline[j];
            if (previousElement.id === element.id && previousElement.branch !== undefined) {
              pathsVisited--;
              if (previousElement.branch === element.enter) {
                previousElement.display.visited = true;
              } else {
                previousElement.display.visited = false;
              }
            }
          }
        }
      }


      if (element.name === 'for' || element.name === 'do' || element.name === 'while') {
        if (element[element.name] === 'cycle') {
          element.primary = false;
        }
      }

      if (element.pointsTo) {
        if (element.pointsTo.type === 'array' || element.pointsTo.type === 'object') {
          element.primary = false;
          element.display.visited = false;
          element.display.rendered = false;
        }
      }

      timeline[index] = element; 
    } ); 

    resolve(data);
  
  } );
}

module.exports = RenderProperties;