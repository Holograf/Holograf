var y = 0;
for (var x = 0; x <= 3; x++) {
  y++;
}



while (var y <= 3) {
  y++;
}


var y = 5;
if (y < 10) {
  y++;
} 

var y = 5;
if (y < 10) {
  y++;
} else {
  y--;
}

var y = 5;
if (y < 10) {
  y++;
} else if (y > 20) {
  y--;
} else {
  y = y * 2;
}

var f = function(x) {
  x++;
  return x;
}
var y = f(3)


var f = function(x) {
  x++;
  if (x < 12) {
    return true;
  } else {
    return false;
  }
}
var y = f(3)


var f = function (n) {
 if (n < 2){
   return 1;
 }else{
   return f(n-2) + f(n-1);
 }
}
var x = f(5);