module.exports = {
input: function() {
var f = function () {};
},
output: function() {
var f = function () {
    ___Program.invoke('f');
    ___Program.return('f');
};
___Program.function('f', f);
}}