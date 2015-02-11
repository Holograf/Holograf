/**
 * @jsx React.DOM
 */

var React = require('react');



module.exports = React.createClass({

  graph: {},

  formatData: function() {
    var data = this.props.data
    var x = data.map(function (pair) {
      return pair[0];
    });
    x = ['x'].concat(x);
    var y = data.map(function (pair) {
      return pair[1];
    });

    var name = this.props.data.name || 'data';
    var xs = {};
    xs[name] = 'x';

    data = [name].concat(y);

    this.graph.load({
      columns: [x, data],
      xs: xs
    });
    this.graph.unload({
      ids: ' '
    });
  },

  componentDidMount: function() {

    var el = this.getDOMNode();
    console.log(this.props.data);
    this.graph = c3.generate({
        bindto: el,
        data: {
          columns: [
              [' ', 0]
          ]
        }
    });

  },

  componentDidUpdate: function() {
      var el = this.getDOMNode();
      this.formatData();
    },


  render: function() {

    console.log(this.props.data);

    return (
      <div id="chart"></div>
    );
  }
});


