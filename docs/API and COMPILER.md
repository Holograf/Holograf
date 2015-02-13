# SuspiciousPi API and Compiler

The goal of the compiler is to create a representation of the program state over time It accomplishes this by performing four tasks:

1. Parse the code into Abstract Syntax Tree (AST) format

1. Inject 'watchpoints' into the AST to update the program state when they are reached in the code

1. Flatten the AST back into readable code

1. Execute the injected code in order to populate a data structure with the program's flow and state information.

These four actions are performed by four files in the 'compiler' folder - Compiler.js, Execute.js, Inject.js, and Program.js.

### Parsing into AST

The compiler uses [esprima](http://esprima.org/) to parse the code into AST format. 

### Watchpoint injection

Watchpoints are injected into every point of the code in which meaningful program state information is to be captured. Watchpoints are created as methods and properties of a ___Program object. We'll instantiate this object just before executing the injected code, allowing us to capture the state of the program as it executes.

**Variables**

```javascript
// before injection
var x = 'hello world';
x = x + ' and dog';
```
```javascript
// after injection
var x = 'hello world';
___Program.set('x', x);
x = x + ' and dog';
___Program.set('x', x);
```

In this example, a 'set' method on the ___Program object is injected after both variable declaration and variable modification. This allows us to capture the state of the variable 'x' after instantiation and modification.

**Loops**

```javascript
// before injection
var sum = 0;
while (sum < 3) {
  sum = sum + 1;
}
```
```javascript
// after injection
 var sum = 0;
___Program.set('sum', sum);
___Program.loop('while', 'open');
while (sum < 3) {
    ___Program.loop('while', 'cycle');
    sum = sum + 1;
    ___Program.set('sum', sum);
}
___Program.loop('while', 'close');
```

Loops are also injected for both flow control and incrementor state information. The ___Program.loop method has three possible states: 'open', 'close', and 'cycle', which track the flow control of a loop's execution. In case of a loop's non-entry, the ___Program.loop('open') call is immediately followed by the ___Program.loop('close') call.

```javascript
// before injection
var sum = 0;
for (var i = 0; i < 3; i++) {
  sum = sum + i
}
```
```javascript
// after injection
 var sum = 0;
___Program.set('sum', sum);
___Program.set('i', 0);
___Program.loop('for', 'open');
for (var i = 0; i < 3; i++) {
    ___Program.loop('for', 'cycle');
    ___Program.set('i', i);
    sum = sum + i;
    ___Program.set('sum', sum);
}
___Program.loop('for', 'close');
___Program.set('i', i);
```

A for loop is also injected with a ___Program.set watchpoint to track the iterator at three points in the code: At the instantiation of the iterator (i) variable prior to entering the loop, at each cycle of the loop, and after completion of the loop. Note that the value of the iterator will be logged twice on the first cycle of the loop with this implementation.

**Conditionals**
```javascript
// before injection
if (x < 5) {
    var y = 'Low five!';
} else if (x > 10) {
  var y = 'High five!';
} else {
  var y = 'wut?';
}
___Program.block('if', 'close');
```
```javascript
// after injection
___Program.block('if', 3);
if (x < 5) {
    ___Program.enter('if', 0);
    var y = 'Low five!';
    ___Program.set('y', y);
} else if (x > 10) {
    ___Program.enter('if', 1);
    var y = 'High five!';
    ___Program.set('y', y);
} else {
    ___Program.enter('if', 2);
    var y = 'wut?';
    ___Program.set('y', y);
}
___Program.block('if', 'close');
```

Conditionals are instantiated with the ___Program.block method, with a value of 'if' as its first parameter and the number of paths (defined as the initial conditional and all subsequent else and else if calls) as its second parameter. Like loops, they are also wrapped with a 'close' parameter passed to the watcher. Each of the paths of a conditional is injected with a ___Program.enter() method that accepts the index of the entered path as its second parameter.

**Functions**

```javascript
var f = function(n) {
  return n + 1;
}
```
```javascript
var f = function(n) {
  ___Program.invoke('f');
  ___Program.param('n', n);
  ___Program.returnState = n + 1;
  ___Program.return('f');
  return ___Program.returnState;
  ___Program.return('f');
}
___Program.function('f')
```
Functions present a number of special challenges that must be accounted for. After the function is declared, a ___Program.function method is invoked with the function name. This is very similar to a variable watcher, since functions are effectively stored as variables until executed. Inside of the function block, a ___Program.invoke method is injected to signal the invocation of the function. Immediately afterwards, a ___Program.param method is invoked for each of the explicitly declared parameters (in this case, just n), in order to see which variables were implicity declared inside the scope of the function by invocation.

Return statements present a unique challenge - in order to observe the returned value of the function, the value to be returned must be assigned to the intermediary variable ___Program.returnState. A ___Program.return() method is then injected prior to the return statement to indicate the the function is returning. This method is also injected at the end of the function body to indicate an implicit exit of the function.

### Code regeneration

The Compiler uses [escodegen](https://github.com/estools/escodegen) to generate code from the injected AST object.

### Program execution

The injected code is then simply executed inside of an eval statement. The ___Program object is instantiated as an instance of the Program class. This class contains all of the injection mehtods which are used to create a timeline of the flow of data through the program. This data is represented by three properties: components, programState, and scope.

**components**

Each item of interest in the program is registered as a component - this consists of variables, conditionals, loops, and function invocations. Each component has a type: 'var' for variables, 'block' for conditionals and loops, and 'invoke' for function invocations.

Each component has a unique id that is assigned incrementally based on which scope it was instantiated. A function invocation creates a new scope that will cause components of the same name or type to be registered as new components

Each component also has 'block' and 'scope' properties that represent the id of the block it is contained in and the scope in which it was 




