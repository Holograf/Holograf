module.exports = {
input: function() {
var object = {
  name: 'andy'
}
object.name = 'luke';
},
output: function() {
var object = { name: 'andy' };
___Program.object('object', object);
object.name = 'luke';
___Program.setObjectProperty('object.name', object.name);
}}