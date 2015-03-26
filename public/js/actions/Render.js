// app-actions.js
var AppStore = require('../stores/AppStore');
var compileCode = require('../compiler/Compiler');
var Theatre = require('../three/Theatre');
var ThreeActions = require('./ThreeActions');


Render = function() {

  if (AppStore.isCompiled()) {
    AppStore.reset();
  }

  setTimeout(function (){
    AppStore.setLoading(true);
    AppStore.emitChange();
  }, 200);

  compileCode(AppStore.getCode())
    .then(function (data) {
      AppStore.setCompiled(true);
      AppStore.setData(data);
      AppStore.emitChange();

      setTimeout(function() {

        Theatre.display(data, function () {
          setTimeout(function() {
            AppStore.setLoading(false);
            AppStore.setSelectedTab(2);
            AppStore.emitChange();
          }, 300);
        });

      }, 300);
    })
    .error(function (error) {
      AppStore.setError({
        line: error.lineno,
        message: error.message
      });
      AppStore.setLoading(false);
      AppStore.emitChange();
    })
},

module.exports = Render;
