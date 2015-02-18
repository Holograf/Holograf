module.exports = {
input: function() {
var counter = 0;
for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    counter++;
  }
}
},
output: function() {
var counter = 0;
___Program.set('counter', counter);
___Program.set('i', 0);
___Program.loop('for', 'open');
for (var i = 0; i < 3; i++) {
    ___Program.loop('for', 'cycle');
    ___Program.set('i', i);
    ___Program.set('j', 0);
    ___Program.loop('for', 'open');
    for (var j = 0; j < 3; j++) {
        ___Program.loop('for', 'cycle');
        ___Program.set('j', j);
        counter++;
        ___Program.set('counter', counter);
    }
    ___Program.loop('for', 'close');
    ___Program.set('j', j);
}
___Program.loop('for', 'close');
___Program.set('i', i);
}}