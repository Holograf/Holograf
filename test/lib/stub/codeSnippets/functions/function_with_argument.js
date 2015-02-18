module.exports = {
input: function() {
var f = function (n) {
  n++;
}
},
output: function() {
var f = function (n) {
    ___Program.invoke('f');
    ___Program.param('n', n);
    n++;
    ___Program.set('n', n);
    ___Program.return('f');
};
___Program.function('f', f);
}}