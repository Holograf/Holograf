var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var VisualTimeline = function (theatre) {
  var timeline = theatre.timeline;
  var scopes = theatre.data.scopes;

  var maxSize = theatre.maxSize;
  var interval = maxSize / (timeline.length + 1);

  var material = new THREE.LineBasicMaterial( { color: constants.color.timeline, transparent:true, opacity:0 } );
  var geometry = new THREE.Geometry();

  for (var i = 0; i < timeline.length; i++){
    var timelineElement = timeline[i]

    if (timelineElement.display.visited) {
      var x = timelineElement.position.x2;
      var y = timelineElement.position.y2;
      var z = timelineElement.position.z2; 

      geometry.vertices.push(
        new THREE.Vector3( x, y, z )
      );
    }
  }
  var line = new THREE.Line( geometry, material );
  line.show = new TWEEN.Tween(line.material).to({opacity:1}, constants.time.timelineFade)
    .easing(TWEEN.Easing.Exponential.In)
    .delay(constants.time.timelineDelay);
  line.hide = new TWEEN.Tween(line.material).to({opacity:0}, constants.time.timelineFade).easing(TWEEN.Easing.Exponential.Out);
  
  line.name = 'visualTimeline';
  return line;
};

module.exports = VisualTimeline;