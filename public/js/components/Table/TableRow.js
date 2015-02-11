/**
 * @jsx React.DOM
 */

var React = require('react');
var fileUtil = require('../../utils/fileUtil.js');
var FileType = require('../File/FileType.js');
var FileSize = require('../File/FileSize.js');
var Modified = require('../File/Modified.js');
var Actions = require('../../actions/Actions');

var DragDropMixin = require('react-dnd').DragDropMixin;
var NativeDragItemTypes = require('react-dnd').NativeDragItemTypes;


module.exports = React.createClass({

  mixins: [DragDropMixin],

  handleClick: function(event) {
    event.preventDefault();
    if (this.props.file.meta.is_dir) {
      Actions.enterFolder(this.props.file.name, this.props.cloudService);
    } else {
      Actions.downloadFile(this.props.file, this.props.cloudService);
    }
  },

  configureDragDrop: function(registerType) {
    registerType(NativeDragItemTypes.FILE, {
      dropTarget: {
        acceptDrop: function (item) {
          Actions.uploadFile(item.files[0], this.props.cloudService);
        }
      }
    });

    registerType('file', {
      // dragSource, when specified, is { beginDrag(), canDrag()?, endDrag(dropEffect)? }
      dragSource: {
        // beginDrag should return { item, dragAnchors?, dragPreview?, dragEffect? }
        beginDrag: function() {
          console.log('DRAG!');
          return {
            item: this.props.file
          };
        }
      },

      dropTarget: {
        acceptDrop: function(file) {
          // Do something with image! for example,
          console.log('DROP!');
          console.log(file);
        }
      }
    });
  },

  render: function() {

    var file = this.props.file;
    var icon = 'img/icons/' + fileUtil.icon(file);

    var fileDropState = this.getDropState('file');
    var nativeDropState = this.getDropState(NativeDragItemTypes.FILE);

    return (
        <tr {...this.dropTargetFor('file', NativeDragItemTypes.FILE)}
            className={fileDropState.isHovering || nativeDropState.isHovering ? 'dragover' : ''}>
          {/* Add {...this.dragSourceFor} handlers to a nested node */}
            <td {...this.dragSourceFor('file')}>
              <a href={'#'} onClick={this.handleClick}>
                <img src={ icon } className={'icon'} />
                { file.name } 
              </a>
            </td>
            <FileType file={file} />
            <FileSize file={file} />
            <Modified file={file} />
        </tr>
    );
  }

});
