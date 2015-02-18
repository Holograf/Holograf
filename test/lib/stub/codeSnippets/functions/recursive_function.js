module.exports = {
input: function() {
var fibonacci = function (n) {
  if (n < 2){
    return 1;
  }else{
    return fibonacci(n-2) + fibonacci(n-1);
  }
}
},
output: function() {
var fibonacci = function (n) {
    ___Program.invoke('fibonacci');
    ___Program.param('n', n);
    ___Program.block('if', 2);
    if (n < 2) {
        ___Program.enter('if', 0);
        ___Program.returnState = 1;
        ___Program.return('fibonacci');
        return ___Program.returnState;
    } else {
        ___Program.enter('if', 1);
        ___Program.returnState = fibonacci(n - 2) + fibonacci(n - 1);
        ___Program.return('fibonacci');
        return ___Program.returnState;
    }
    ___Program.block('if', 'close');
    ___Program.return('fibonacci');
};
___Program.function('fibonacci', fibonacci);
}}