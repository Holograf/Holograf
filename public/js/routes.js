var React = require('react');
var Router = require('react-router');

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Body {...this.state}}/>
    <Route name="code" path="code/:id" handler={Body {...this.state}}/>
    <NotFoundRoute handler={Body {...this.state}}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});

// TODO: Modularize routes?