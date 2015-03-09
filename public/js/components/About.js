/**
 * @jsx React.DOM
 */

// About.js
var React = require('react');
var TechStackItem = require('./TechStackItem/');
var Member = require('./Member/');
var Actions = require('../actions/Actions');

module.exports = React.createClass({

  render: function() {

    // tech stack: Three.js, Raphael, Esprima, React, Flux, Node, Express, Mongo, AWS, Jasmine, Gulp.js, Bluebird promises, 

    // <StackItem name="Esprima" image="" link="">
    // <StackItem name="AWS" image="" link="">
    // <StackItem name="Bluebird" image="" link="">
    

    return (
      <div>
        <h1>Inspiration for Holograf</h1>
        <p> When a programmer works, she is essentially blind. She has to keep an abstract image of the processes and her data structure in her head. We've created a way to visualize these things in a tangible and intuitive way.
        </p> 

        <h1>The Tech Stack</h1>
          <TechStackItem name="Three.js" image="../img/three.png" link="http://threejs.org/" />
          <TechStackItem name="Raphael" image="img/raphael.png" link="http://raphaeljs.com/" />
          <TechStackItem name="React.js" image="img/react.png" link="http://facebook.github.io/react/" />
          <TechStackItem name="Flux" image="img/flux.png" link="http://facebook.github.io/flux/docs/overview.html" />
          <TechStackItem name="Node.js" image="img/node.png" link="https://nodejs.org/" />
          <TechStackItem name="MongoDB" image="img/mongodb.png" link="http://www.mongodb.org/" />
          <TechStackItem name="Gulp.js" image="img/gulp.png" link="http://gulpjs.com/" />
          <TechStackItem name="Jasmine" image="img/jasmine.png" link="http://jasmine.github.io/" />


        <h1>The Holograf Team</h1>
          <Member name="Andy Coenen" image="img/andy.png" linkedIn="" gitHub="" website="" />
          <Member name="Luke Davis" image="img/luke.png" linkedIn="" gitHub="" website="" />
          <Member name="Ryan Lee" image="img/ryan.png" linkedIn="" gitHub="" website="" />
          <Member name="Matt Conrad" image="img/matt.png" linkedIn="" gitHub="" website="" />

      </div>
    );
  }
});

