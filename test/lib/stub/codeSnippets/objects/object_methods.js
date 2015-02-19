module.exports = {
input: function() {
var object = {
  speak: function () {
    return 'woof!';
  }
};
},
output: function() {
var object = {
    speak: function () {
        ___Program.method('object.speak');
        ___Program.returnState = 'woof!';
        ___Program.return('object.speak');
        return ___Program.returnState;
        ___Program.return('object.speak');
    }
};
___Program.object('object', object);
}}