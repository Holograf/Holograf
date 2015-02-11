/**
 * @jsx React.DOM
 */

var React = require('react');
var fileUtil = require('../../utils/fileUtil.js');

var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;

module.exports = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var file = this.props.file;
    var modified = fileUtil.modified(file)

    if (modified) {
      return (
        <td>
          <FormattedDate
            value = { modified }
            day = "numeric"
            month = "short"
            year = "numeric" />
        </td>
      );
    } else {
      return (
        <td> --- </td>
      ); 
    }
  }

});
