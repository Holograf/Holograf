/**
 * @jsx React.DOM
 */

$(document).ready(function() {

  var React = require('react');
  var Router = require('react-router');
  var App = require('./App.js');
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var NotFoundRoute = Router.NotFoundRoute;
  var RouteHandler = Router.RouteHandler;
  var Link = Router.Link;
  require('codemirror/mode/javascript/javascript');


  var Main = React.createClass({
    render: function() {
      return (
        <RouteHandler/>
      );
    }
  })

  var routes = (
    <Route handler={Main}>
      <DefaultRoute handler={App}/>
      <Route name="code" path="code/:id" handler={App}/>
      <NotFoundRoute handler={App}/>
    </Route>
  );

  Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('App'));
  });

});
