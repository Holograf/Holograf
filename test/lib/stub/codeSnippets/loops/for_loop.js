module.exports = {
input: function() {
var counter = 0;
for (var i = 0; i < 10; i++) {
  counter += i;
}
},
output: function() {
var counter = 0;
___Program.set('counter', counter);
___Program.set('i', 0);
___Program.loop('for', 'open');
for (var i = 0; i < 10; i++) {
    ___Program.loop('for', 'cycle');
    ___Program.set('i', i);
    counter += i;
    ___Program.set('counter', counter);
}
___Program.loop('for', 'close');
___Program.set('i', i);
}}