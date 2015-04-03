var utils = require('./utils');

var theatre = {};
theatre.init = require('./methods/Init');
theatre.view = require('./methods/View');
theatre.select = require('./methods/Select')(theatre);
theatre.actions = require('../actions/ThreeActions');

theatre.display = function(data, renderEnd) {	
	this.timeline = data.timeline;
	this.data = data;
	
	theatre.init();

	renderEnd();
	animate();
	
	function animate() {
		theatre.reqId = requestAnimationFrame( animate );
		render();
	}

	function render() {
		TWEEN.update();
		theatre.renderer.render( theatre.scene, theatre.camera );
	}
}

theatre.add = function (element) {
	var name = element.name;
	theatre[name] = element;
	theatre.scene.add( element );
}

theatre.pause = function(){
	theatre.scenePaused ? theatre.timelight.tween.start() : theatre.timelight.tween.stop();
	theatre.scenePaused = !theatre.scenePaused;
};

theatre.expand = function() {
	var composite = theatre.composite;
	var visualTimeline = theatre.visualTimeline;
	var timelight = theatre.timelight;
	var selection = theatre.selection;

	var action = theatre.expanded ? "collapse" : "expand";
	for (var i = 0; i < composite.children.length; i++){
		composite.children[i][action].start();
	}
	if (action === 'collapse'){
		visualTimeline.hide.start();
		timelight.material.opacity = 0;
		utils.dull(composite);
	} else {
		visualTimeline.show.start();
		timelight.material.opacity = 1;
	}
	theatre.pause();
	selection.material.opacity = 0;
	theatre.expanded = !theatre.expanded;
};

theatre.clearScene = function() {
	cancelAnimationFrame(theatre.reqId);  // Stop the animation
	// document.removeEventListener( 'keydown', controls.onKeyDown, false );
	theatre.container.removeEventListener( 'mousemove', onMouseMove, false );
	theatre.container.removeEventListener( 'mousedown', onMouseDown, false);
	window.removeEventListener( 'resize', onWindowResize, false );

	theatre.scene = null;
	theatre.camera = null;
	theatre.controls = null;
	theatre.nodeView = false;
	theatre.expanded = false;
	theatre.scenePaused = true;

	empty(theatre.container);

	function empty(elem) {
    while (elem.lastChild) { 
    	elem.removeChild(elem.lastChild);
    }
	}

};


module.exports = theatre;
