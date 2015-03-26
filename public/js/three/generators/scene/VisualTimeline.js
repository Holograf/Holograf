var utils = require('../../utils');
var geometries = require('../../Geometries');
var constants = require('../../Constants');

var VisualTimeline = function (theatre) {
  var timeline = theatre.timeline;
  var scopes = theatre.data.scopes;

  var maxSize = timeline.length * constants.size.step;
  var interval = maxSize / (timeline.length + 1);

  var x = 0;
  var y = 0
  var z = 0;

  var material = new THREE.LineBasicMaterial( { color: constants.color.timeline, transparent:true, opacity:0 } );
  var geometry = new THREE.Geometry();

  for (var i = 0; i < timeline.length; i++){
    var step = timeline[i]
    z += interval;
    
    if (step.return){
      x -= constants.size.scope;
    }

    geometry.vertices.push(
      new THREE.Vector3( x, 0, z )
    );

    if (step.invoke){
      x += constants.size.scope;
    }
  }
  var line = new THREE.Line( geometry, material );
  line.show = new TWEEN.Tween(line.material).to({opacity:1}, constants.time.timelineFade).easing(TWEEN.Easing.Exponential.In);
  line.hide = new TWEEN.Tween(line.material).to({opacity:0}, constants.time.timelineFade).easing(TWEEN.Easing.Exponential.Out);
  
  line.name = 'visualTimeline';
  return line;
};

module.exports = VisualTimeline;