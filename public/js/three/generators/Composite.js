var utils = require('../utils');
var geometries = require('../Geometries');
var generate = require('./Generators');
var constants = require('../Constants');

var Composite = function(theatre){

	var timeline = theatre.timeline;
	var scopes = theatre.data.scopes;
	var timelight = theatre.timelight;
		
	var composite = new THREE.Object3D();
	composite.maxSize = constants.size.step * timeline.length;

	var buffer = constants.size.buffer;
	var leftMargin = (composite.maxSize / 2) - ((timeline.length * buffer) / 2);
	var interval = composite.maxSize / (timeline.length + 1);
	
	
	var cycleTime = constants.time.cycle * timeline.length;
	var cycleStep = cycleTime / timeline.length;
	var animations = [];
	

	//all the possible heiroglyphs
	var position = {
		x1: 0, 
		x2: 0,
		y1: 0,
		y2: 0
  };

	animations.push(new TWEEN.Tween(timelight.position).to({x:position.x2}, cycleStep) );
	var dx = 0;

	for (var i = 0; i < timeline.length; i++) {
		var component = timeline[i];
		position.componentData = component;
		
		if (component.return) {
			position.x2 -= constants.size.scope;
		}

		var radius = 500;
		if (component.block && component.block > 0){
			position.radius = 200;
		}
		
		position.z1 = leftMargin + (buffer * i);
		position.z2 = interval + (interval * i);


		
		nextTween = new TWEEN.Tween(timelight.position).to({x:position.x2, y:position.y2, z:position.z2}, cycleStep);
		animations.push(nextTween);
		animations[i].chain( animations[i+1] );

		position.x2 += dx;
		dx = 0;

		
		if (component.pointsTo) {
		  if (component.pointsTo.type === 'array') {
			  generate.array(composite, position);
		  } else if (component.pointsTo.type === 'object') {
			  generate.object(composite, position);
		  } else if (component.pointsTo.type === 'function'){
			  generate.functionDeclaration(composite, position);
		  } 
		} 

		else if (component.type === "block") {
			

			if (component.name === 'if') {
				generate.conditional(composite, position);				
			}

			else if (component.name === "for" || component.name === 'while' || component.name === 'do') {
				if (step[component.name] === "cycle") {
				   generate.loopCycle(composite, position);
				} else {
					 generate.loop(composite, position);
				}
			}
		} 

		else if (component.invoke) {
			dx = constants.size.scope;
			generate.functionInvocation(composite, position);
		} else if (component.return){
			generate.functionReturn(composite, position);
		} else {
			generate.value(composite, position);
		}
		
	}

	animations.push(new TWEEN.Tween(timelight.position).to({x:0,z:0}, 1) );	
	animations[animations.length - 2].chain(animations[animations.length - 1]);
	animations[animations.length - 1].chain(animations[0]);
	timelight.tween = animations[0];
	
	composite.name = 'composite';
	return composite;
};	

module.exports = Composite;