module.exports = {
input: function() {
var object = {
  nested: {
  f: function () {
      return true;
    }
  }
};
},
output: function() {
var object = {
    nested: {
        f: function () {
            ___Program.method('object.nested.f');
            ___Program.returnState = true;
            ___Program.return('object.nested.f');
            return ___Program.returnState;
            ___Program.return('object.nested.f');
        }
    }
};
___Program.object('object', object);
}}