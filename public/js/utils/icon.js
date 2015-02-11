var fileType = require('./fileType.js');

var icons = {
  'archive': 'Archive.png',
  'pdf': 'Document_Red.png',
  'audio': 'Audio.png',
  'image': 'Image.png',
  'video': 'Video.png',
  'folder': 'Folder.png',
  'document': 'Document_Blank.png'
}

module.exports = function (file) {
  return icons[fileType(file)] || 'Document_Blank.png';
}

