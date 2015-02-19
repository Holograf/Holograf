module.exports = {
input: function() {
var f = function () {
  return 1;
};
},
output: function() {
var f = function () {
    ___Program.invoke('f');
    ___Program.returnState = 1;
    ___Program.return('f');
    return ___Program.returnState;
    ___Program.return('f');
};
___Program.function('f', f);
}}