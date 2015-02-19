module.exports = {
input: function() {
var object = {};
object.f = function () {
  return 1;
}
},
output: function() {
var object = {};
___Program.object('object', object);
object.f = function () {
    ___Program.invoke('object.f');
    ___Program.returnState = 1;
    ___Program.return('object.f');
    return ___Program.returnState;
    ___Program.return('object.f');
};
___Program.setObjectProperty('object.f', object.f);
}}