var RenderProperties = function (data) {

  return new Promise (function (resolve, reject) {

    data.timeline.forEach(function (element, index, timeline) {

      element.display = {
        rendered: true,
        visited: true
      };
      element.primary = true;

      //--------------------------Conditionals
      if (element.type === 'if') {
        if (element.branch !== undefined) {
          if (element.branch >= element.paths) { // Check for elements with a branch greater than the number of paths, 
                                                 // indicating the branch bypassing the if statement
            setElementProperties(element, {rendered: false, visited: false, primary: false})
          }
        } 
        
        if (element.enter !== undefined) {  // Check for a conditional enter, and parse backwards to set which conditional 
                                            // branches are visited
          if (timeline[index + 1].return === undefined) {
            setElementProperties(element, {visited: false})
          } else {
            setElementProperties(element, {visited: true})
          }

          if (element.enter >= element.paths) {
            setElementProperties(element, {visited: true})
          }

          setElementProperties(element, {rendered: false})

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
                setElementProperties(previousElement, {visited: true})
              } else {
                setElementProperties(previousElement, {visited: false})
              }
            }
          }
        }
      }

      if (element.type === 'element') {
        setElementProperties(element, {visited: true, primary: false})
      }

      if (element.type === 'loop' && element.state === 'cycle') {
        setElementProperties(element, {primary: false})
      }

      if (element.pointsTo) {
        if (element.pointsTo.type === 'array' || element.pointsTo.type === 'object') {
          setElementProperties(element, {rendered: false, visited: false, primary: false})
        }
      }

      timeline[index] = element; 
    } ); 

    resolve(data);
  
  } );
}


var setElementProperties = function (element, options) {
  if (options.primary !== undefined) {
    element.primary = options.primary;
  }
  if (options.rendered !== undefined) {
    element.display.rendered = options.rendered;
  }
  if (options.visited !== undefined) {
    element.display.visited = options.visited
  }
}

module.exports = RenderProperties;