// Raphael canvas
    // div with id='raphael-canvas' added to React component Visual2D.js 

var React = require('react');
var Raphael = require('./2DCanvas.js');

// $("body").html(d);    
// var b=davis.quickBox();
// zi.css();

// What to do to set the canvas dimensions?
var 2DCanvas = React.createClass({

  render: function() {

    var canvas = new Raphael("raphael-canvas");

    for (var i = 0; i < 100; i++) {
        var x = Math.random() * b.right;
        var y = Math.random() * b.bottom;
        var r = Math.random() * 100;

        c.circle(x, y, r)
            .attr({fill:davis.randomColor(), opacity: 0.5})
            .animate({fill:davis.randomColor()}, 1000)     // can also take easing fn or callback
            .animate({fill:davis.randomColor()}, 1000, function(){
                this.animate({fill:'blue', opacity: 0.1}, 10000);
            });    
            
        // c.rect(x, y, 100, 100);
    }

    var pathString = 'M 100 100 L 180 180 L 5 5 L 400 50 Z';
    var otherPathString = 'M 20 20 L 300 300 L 200 50 Z'

    c.path(pathString)
        .animate({path:otherPathString}, 2000);

  }

});

module.exports = 2DCanvas;