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

**Components**

Each item of interest in the program is registered as a component - this consists of variables, conditionals, loops, and function invocations. 

Each component has a unique id that is assigned incrementally based on which scope it was instantiated. A function invocation creates a new scope that will cause components of the same name or type to be registered as new components.

Each component also has 'block' and 'scope' properties that represent the id of the block it is contained in and the scope in which it was instantiated or invoked.

```javascript
// Code to be compiled
var f = function (n) {
  if (n < 3){
    return true;
  } else {
    return false
  }
}
var x = f(1);
```
```javascript
// Compiled components array
"components": [
  {
    "id": 0,
    "type": "block",
    "name": "global",
    "block": 0,
    "scope": 0,
    "createdAt": 0
  },
  { "id": 1,
    "type": "var",
    "name": "f",
    "block": 0,
    "scope": 0,
    "createdAt": 0
  },
  { "id": 2,
    "type": "invoke",
    "name": "f",
    "block": 0,
    "scope": 0,
    "createdAt": 1,
    "function": 1
  },
  { "id": 3,
    "type": "var",
    "name": "n",
    "block": 0,
    "scope": 2,
    "createdAt": 2
  },
  { "id": 4,
    "type": "block",
    "name": "if",
    "block": 0,
    "scope": 2,
    "createdAt": 3,
    "paths": 2
  },
  { "id": 5,
    "type": "var",
    "name": "x",
    "block": 0,
    "scope": 0,
    "createdAt": 6
  }
]
```
Every component has an id, a type, block, scope, and createdAt attributes. Each component has a type: `var` for variables, `block` for conditionals and loops, and `invoke` for function invocations.

A `var` component represents both variables, and function definitions (which are stored just like regular variables).

A `block` component represents either a conditional or a loop. Different kinds of loops have different names: `for` for 'for' loops, `while` for while loops, and `do` for do/while loops. An if statement (and its subsequent `else` and `else if` statements) are represented with a name of 'if'. 'if' blocks have a unique property called `paths`, which indicates the total number of if, else/if, and else blocks in the conditional.
In addition, there is a special `block` with the name 'global' in every components array. This exists to allow easy indexing based on the id value (instead of id-1).

An `invoke` component represents a function invocation. The `name` property represents the name of the invoked function, and the `function` property represents the id of the original function declaration of the currently invoked function.

Each component has a `block` property, which is the id of the block the component originates from. Likewise, the `scope` property defines the id of the scope the component was initialized in. Each function invocation creates a new scope, listed as the id of that function ivocation. For `block` and `scope`, the value 0 represents no block and the global scope, respectively.

Each component also has a 'createdAt' property, which describes which step in the `programSteps` array the component was instantiated.

**Program Steps**
```javascript
// Code to be compiled
var x = 0;
while (x < 2) {
  x = x + 1;
}
```
```javascript
"programSteps": [
  { "id": 1,
    "value": 0
  },
  { "id": 2,
    "while": "open"
  },
  { "id": 2,
    "while": "cycle"
  },
  { "id": 1,
    "value": 1
  },
  { "id": 2,
    "while": "cycle"
  },
  { "id": 1,
    "value": 2
  },
  { "id": 2,
    "while": "close"
  }
]
```
The above program steps array represents the ordered state of the program throughout the course of its execution. Each step has an id corresponding to a particular component (at index id in the components array), and a property relevant to that particular step.

1. A variable with `id` 1 (x) is assigned a value of 0.

1. Loop invocations have a property corresponding to their type. A while loop therfore has a property `while`, with a value 'open' to signify the start of the loop.

1. On each iteration of the loop, a value of 'cycle' is assigned to the loop-specific (in this case `while`) property.

1. The variable with `id` of 1 (x) is changed to a value of 1. Note that operations are not tracked - just the result of the operation.

1. Another 'cycle' is logged.

1. The variable with `id` 1 is changed to a value of 2.

1. The loop exits with a value of 'close'. In case of a loop not executing, this step comes immediately after the loop's 'open' step.


```javascript
// Code to be compiled
var f = function (n) {
  if (n < 3){
    return true;
  } else {
    return false
  }
}
var x = f(1);
```
```javascript
"programSteps": [
  { "id": 1,
    "value": "___function code"
  },
  { "id": 2,
    "invoke": "f"
  },
  { "id": 3,
    "param": 1
  },
  { "id": 4,
    "if": 2
  },
  { "id": 4,
    "enter": 0
  },
  { "id": 2,
    "return": true
  },
  { "id": 5,
    "value": true
  }
]
```
1. The first line `var f = function (n) {...}` is essentially a variable declaration, with `f` being assigned a function. This is represented by the special identifier `___function code` to signify that it is a function definition, and not a normal value.

1. Next, the function `f` is invoked. The id corresponds to the function invocation, allowing for tracking of nested function calls of the same name, as in recursion.

1. Each explicitly named parameter (listed in the parentheses of the function declaration) is defined as a variable. Rather than `value` property, these variables have a `param` property to indicate they are parameter instantiations.

1. Each conditional block has an `if` property, with a value corresponding to the total number of if, else if, and else statements it consists of.

1. Upon satisfying one portion of the conditional, a step with an `enter` property is created. The `enter` property is the index (zero-based) of the path in the if / else if / else block. Here we enter the first `if` statement of an if / else block with 2 paths, so the value of `enter` is 0.

1. The next step represents the return of the invoked function. The `id` of the function invocation is given, along with a `return` property with the returned value.

1. Finally, a simple variable declaration is given to x (id 5) with the returned value (true).