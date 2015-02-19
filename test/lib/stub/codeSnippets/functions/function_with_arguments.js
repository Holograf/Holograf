module.exports = {
input: function() {
var f = function (x, y, z) {
  x = y + z;
}
},
output: function() {
var f = function (x, y, z) {
    ___Program.invoke('f');
    ___Program.param('x', x);
    ___Program.param('y', y);
    ___Program.param('z', z);
    x = y + z;
    ___Program.set('x', x);
    ___Program.return('f');
};
___Program.function('f', f);
}}