module.exports = {
input: function() {
var object = {
  stuff: {}
}
object.stuff.name = 'andy';
},
output: function() {
var object = { stuff: {} };
___Program.object('object', object);
object.stuff.name = 'andy';
___Program.setObjectProperty('object.stuff.name', object.stuff.name);
}}