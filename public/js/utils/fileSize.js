var FormattedDate = ReactIntl.FormattedDate;

var fileSize = function (file) {

  if (!file.meta.is_dir) {
    return file.meta.size;
  }

}

module.exports = fileSize;