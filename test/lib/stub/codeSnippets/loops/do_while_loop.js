module.exports = {
input: function() {
var counter = 0;
do {
    counter++;
} while (counter < 10) 
},
output: function() {
var counter = 0;
___Program.set('counter', counter);
___Program.loop('do', 'open');
do {
    ___Program.loop('do', 'cycle');
    counter++;
    ___Program.set('counter', counter);
} while (counter < 10);
___Program.loop('do', 'close');
}}