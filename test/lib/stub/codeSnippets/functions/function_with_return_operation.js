module.exports = {
input: function() {
var f = function (x) {
  return x * 2;
}
},
output: function() {
var f = function (x) {
    ___Program.invoke('f');
    ___Program.param('x', x);
    ___Program.returnState = x * 2;
    ___Program.return('f');
    return ___Program.returnState;
    ___Program.return('f');
};
___Program.function('f', f);
}}