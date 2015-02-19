module.exports = {
input: function() {
var x = 1;
x = 2;
},
output: function() {
var x = 1;
___Program.set('x', x);
x = 2;
___Program.set('x', x);
}}