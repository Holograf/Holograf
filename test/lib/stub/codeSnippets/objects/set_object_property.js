module.exports = {
input: function() {
var object = {};
object.name = 'andy';
},
output: function() {
var object = {};
___Program.object('object', object);
object.name = 'andy';
___Program.setObjectProperty('object.name', object.name);
}
}