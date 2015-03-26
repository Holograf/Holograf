var utils = require('../utils');
var geometries = require('../Geometries');
var generate = require('./Generators');

var Composite = function(theatre){

	var timeline = theatre.timeline;
	var scopes = theatre.data.scopes;
	var timelight = theatre.timelight;
		
	var composite = new THREE.Object3D();
	composite.maxSize = 100 * timeline.length;
	var buffer = 10;
	var leftMargin = (composite.maxSize / 2) - ((timeline.length*buffer) / 2);
	var interval = composite.maxSize / (timeline.length + 1);
	var z1, z2;
	var x = 0;
	
	var cycleTime = 500 * timeline.length;
	var cycleStep = cycleTime / timeline.length;
	var animations = [];
	
	animations.push(new TWEEN.Tween(timelight.position).to({x:x}, cycleStep) );
	

	for (var i = 0; i < timeline.length; i++) {
		z1 = leftMargin + (buffer * i);
		z2 = ((interval) + interval * i);
		if (timeline[i].return !== undefined) {
			x-=500;
		}

		var component = timeline[i].component;
		var radius = 500;
		if (component.block && component.block > 0){
			radius = 200;
		}
		

		//all the possible heiroglyphs
		var options = {
			z1: z1, 
			z2: z2, 
			x1: 0, 
			x2: x, 
			componentData: component, 
			radius:radius
	  };
		
		nextTween = new TWEEN.Tween(timelight.position).to({x:x, z:z2}, cycleStep);
		animations.push(nextTween);
		animations[i].chain( animations[i+1] );

		
		if (component.pointsTo) {
		  if (component.pointsTo.type === 'array') {
			  generate.array(composite, options);
		  } else if (component.pointsTo.type === 'object') {
			  generate.object(composite, options);
		  } else if (component.pointsTo.type === 'function'){
			  generate.functionDeclaration(composite, options);
		  } 
		} 

		else if (component.type === "block") {
			if (component.name === 'if') {
				generate.conditional(composite, options);				
			}
			else if (component.name === "for" || component.name === 'while' || component.name === 'do') {
				if (timeline[i][component.name] === "cycle") {
				   generate.loopCycle(composite, options);
				} else {
					 generate.loop(composite, options);
				}
			}
		} 

		else if (component.invoke) {
			x += 500;
			generate.functionInvocation(composite, options);
		} else if (component.return){
			generate.functionReturn(composite, options);
		} else {
			generate.value(composite, options);
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