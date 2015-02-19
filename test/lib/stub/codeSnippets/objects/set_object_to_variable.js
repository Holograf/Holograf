module.exports = {
input: function() {
var object = {
  name: 'andy'
}
object = 12;
},
output: function() {
var object = { name: 'andy' };
___Program.object('object', object);
object = 12;
___Program.set('object', object);
}}