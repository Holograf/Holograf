module.exports = {
input: function() {
var f = function (x) {
  if (x > 10) {
    return 'large';
  } else {
    return 'small';
  }
}
},
output: function() {
var f = function (x) {
    ___Program.invoke('f');
    ___Program.param('x', x);
    ___Program.block('if', 2);
    if (x > 10) {
        ___Program.enter('if', 0);
        ___Program.returnState = 'large';
        ___Program.return('f');
        return ___Program.returnState;
    } else {
        ___Program.enter('if', 1);
        ___Program.returnState = 'small';
        ___Program.return('f');
        return ___Program.returnState;
    }
    ___Program.block('if', 'close');
    ___Program.return('f');
};
___Program.function('f', f);
}}