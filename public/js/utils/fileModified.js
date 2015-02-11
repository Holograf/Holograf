var fileModified = function (file) {
  
  if (!file.meta.is_dir) {
    return file.meta.modified;
  }

}

module.exports = fileModified;