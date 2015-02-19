module.exports = {
input: function() {
var counter = 0;
while (counter < 10) {
  counter++;
}
},
output: function() {
var counter = 0;
___Program.set('counter', counter);
___Program.loop('while', 'open');
while (counter < 10) {
    ___Program.loop('while', 'cycle');
    counter++;
    ___Program.set('counter', counter);
}
___Program.loop('while', 'close');
}}