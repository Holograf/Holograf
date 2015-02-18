module.exports = {
input: function() {
var x = 1;
x += 1;
},
output: function() {
var x = 1;
___Program.set('x', x);
x += 1;
___Program.set('x', x);
}}