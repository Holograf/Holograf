var f = function () {
  return function (n) { return n + 1 };
}
var g = f();
var h = g(3);