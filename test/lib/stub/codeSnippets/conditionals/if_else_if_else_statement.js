module.exports = {
input: function() {
var x = 1;
if (x > 5) {
  var size = 'large';
} else if (size > 3) {
  var size = 'medium';
} else {
  var size = 'small';
}
},
output: function() {
var x = 1;
___Program.set('x', x);
___Program.block('if', 3);
if (x > 5) {
    ___Program.enter('if', 0);
    var size = 'large';
    ___Program.set('size', size);
} else if (size > 3) {
    ___Program.enter('if', 1);
    var size = 'medium';
    ___Program.set('size', size);
} else {
    ___Program.enter('if', 2);
    var size = 'small';
    ___Program.set('size', size);
}
___Program.block('if', 'close');
}}