module.exports = {
input: function() {
var x = 1;
x++;
},
output: function() {
var x = 1;
___Program.set('x', x);
x++;
___Program.set('x', x);
}}