var utils = require('../utils');
var geometries = require('../Geometries');
var generate = require('./Generators');
var constants = require('../Constants');

var Composite = function(theatre){
	var timeline = theatre.timeline;
	var last = timeline[timeline.length - 1];
	var scopes = theatre.data.scopes;
	var timelight = theatre.timelight;
		
	var composite = new THREE.Object3D();
	composite.maxSize = constants.size.step * last.position.x;

	var buffer = constants.size.buffer;
	var leftMargin = (composite.maxSize / 2) - ((last.position.x * buffer) / 2);
	var interval = composite.maxSize / (last.position.x + 1);
	
	
  var position = {
  	x1: 0,
  	x2: 0,
  	y1: 0,
  	y2: 0
  }

  var lastVisitedPosition = {x: 0, y: 0, z:0 };

	var animations = [];
	animations.push(new TWEEN.Tween( timelight.position ).to( { x:position.x2 }, constants.time.cycle)
		                    .delay(constants.time.timelightDelay) 
		              );
	var dx = 0;

	for (var i = 0; i < timeline.length; i++) {
		var timelineElement = timeline[i];
		var position = timelineElement.position;

		var x = timelineElement.position.x;
		timelineElement.position.x1 = leftMargin + (buffer * x);
		timelineElement.position.x2 = interval + (interval * x);

		var y = timelineElement.position.y;
		timelineElement.position.y1 = 0;
		timelineElement.position.y2 = y * constants.size.conditional;

		var z = timelineElement.position.z
		timelineElement.position.z1 = 0;
		timelineElement.position.z2 = z * constants.size.scope;


		if (timelineElement.display.visited) {

			var stepTime = Math.pow(
				Math.pow(lastVisitedPosition.x - position.x2, 2) +
				Math.pow(lastVisitedPosition.y - position.y2, 2) +
				Math.pow(lastVisitedPosition.z - position.z2, 2), 1/2
			) * constants.time.timelightSpeed;

			nextTween = new TWEEN.Tween(timelight.position).to({x:position.x2, y:position.y2, z:position.z2}, stepTime);

			lastVisitedPosition = {
				x: position.x2,
				y: position.y2,
				z: position.z2
			}
			animations.push(nextTween);
			var last = animations.length - 1;
			animations[last - 1].chain( animations[last] );
		}

		
		if (timelineElement.pointsTo) {
		  if (timelineElement.pointsTo.type === 'array') {
			  generate.array(composite, timelineElement);
		  } else if (timelineElement.pointsTo.type === 'object') {
			  generate.object(composite, timelineElement);
		  } else if (timelineElement.pointsTo.type === 'function'){
			  generate.functionDeclaration(composite, timelineElement);
		  } 
		} 

		else if (timelineElement.type === "block") {
			if (timelineElement.name === 'if') {
				generate.conditional(composite, timelineElement);				
			}

			else if (timelineElement.name === "for" || timelineElement.name === 'while' || timelineElement.name === 'do') {
				if (timelineElement[timelineElement.name] === "cycle") {
				   generate.loopCycle(composite, timelineElement);
				} else {
					 generate.loop(composite, timelineElement);
				}
			}
		} 

		else if (timelineElement.invoke) {
			dx = constants.size.scope;
			generate.functionInvocation(composite, timelineElement);
		} else if (timelineElement.return){
			generate.functionReturn(composite, timelineElement);
		} else {
			generate.value(composite, timelineElement);
		}
		
	}




	animations.push(new TWEEN.Tween( timelight.position ).to( {x:0, y:0, z:0}, 1) );	
	animations[animations.length - 2].chain(animations[animations.length - 1]);
	animations[animations.length - 1].chain(animations[0]);
	timelight.tween = animations[0];
	
	composite.name = 'composite';
	return composite;
};	

module.exports = Composite;