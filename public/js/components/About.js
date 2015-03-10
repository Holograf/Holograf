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

    return (
      <div className='about'>
        <h1>Inspiration for Holograf</h1>
        <p className='inspiration'>All of modern programming is handicapped by an unspoken assumption: the programmer has only a narrow view into the workings of the machine, as if looking into a room through a keyhole. Holograf displays the clockwork of your program as an animated mechanism in 3D space, giving the programmer eyes to see her work, as it runs, completely changing the way developers create applications.
        </p> 

        <h1>The Tech Stack</h1>
        <div className='tech-stack'>
          <div className='stack-items'>
            <TechStackItem name="Three.js" image="../img/three.png" link="http://threejs.org/" />
            <TechStackItem name="Raphael" image="img/raphael.png" link="http://raphaeljs.com/" />
            <TechStackItem name="React.js" image="img/react.png" link="http://facebook.github.io/react/" />
            <TechStackItem name="Flux" image="img/flux.png" link="http://facebook.github.io/flux/docs/overview.html" />
            <TechStackItem name="Node.js" image="img/node.png" link="https://nodejs.org/" />
            <TechStackItem name="MongoDB" image="img/mongodb.png" link="http://www.mongodb.org/" />
            <TechStackItem name="Gulp.js" image="img/gulp.png" link="http://gulpjs.com/" />
            <TechStackItem name="Jasmine" image="img/jasmine.png" link="http://jasmine.github.io/" />
          </div>
        </ div>

        <h1>The Holograf Team</h1>
        <div className='team'>
          <Member name="Andy Coenen" image="img/andy.png" linkedIn="" gitHub="" website="" />
          <Member name="Luke Davis" image="img/luke.png" linkedIn="" gitHub="" website="" />
          <Member name="Ryan Lee" image="img/ryan.png" linkedIn="" gitHub="" website="" />
          <Member name="Matt Conrad" image="img/matt.png" linkedIn="" gitHub="" website="" />
        </div>
      </div>
    );
  }
});

