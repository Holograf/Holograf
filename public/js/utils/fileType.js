var mimeTypes = {
  'application/zip': 'archive',
  'application/pdf': 'pdf',
  'audio/basic': 'audio',
  'audio/L24': 'audio',
  'audio/mp4': 'audio',
  'audio/mpeg': 'audio',
  'audio/ogg': 'audio',
  'audio/flac': 'audio',
  'audio/opus': 'audio',
  'audio/vorbis': 'audio',
  'audio/vnd.wave': 'audio',
  'audio/vnd.rn-realaudio': 'audio',
  'audio/webm': 'audio',
  'image/gif': 'image',
  'image/pjpeg': 'image',
  'image/jpeg': 'image',
  'image/png': 'image',
  'image/svg+xml': 'image',
  'image/vnd.djvu': 'image',
  'image/tiff': 'image',
  'image/psd': 'image',
  'video/avi': 'video',
  'video/mpeg': 'video',
  'video/mp4': 'video',
  'video/ogg': 'video',
  'video/quicktime': 'video',
  'video/webm': 'video',
  'video/x-matroska': 'video',
  'video/x-ms-wmv': 'video',
  'video/x-flv': 'video'
}


var fileType = function (file) {

  if (file.meta.is_dir) {
    return 'folder'
  } else {
    return mimeTypes[file.meta.mime_type] || 'document';
  }

}

module.exports = fileType;