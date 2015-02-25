var Program = function () {
  this.programSteps = [];
  this.components = [];
  this.scopes = {
    '0': {}
  };
  this._currentScope = 0;
  this._blockStack = [0];
  this._scopeStack = [0];

  this.initialize();
}

//----------------------------------------------------------------------------------
// Initialization and getter for the AppStore to access the relevant data properties
Program.prototype.initialize = function () {
  this.addComponent('block', 'global');
}

Program.prototype.getData = function () {
  return {
    programSteps: this.programSteps,
    components: this.components,
    scopes: this.scopes
  }
}

//----------------------------------------------------------------------------------
// Block and Scope get methods
Program.prototype.getCurrentBlock = function () {
  return this._blockStack[this._blockStack.length - 1];
}

Program.prototype.getCurrentScope = function () {
  // Check to see if the current scope is being modified by a pending function return
  this.setScope();
  return this._currentScope;
}

Program.prototype.setScope = function () {
  var top = this._scopeStack[this._scopeStack.length - 1];
  if (this.getCurrentScope !== top) {
    this._currentScope = top;
  }
}


//----------------------------------------------------------------------------------
// Step methods
Program.prototype.makeStep = function (id, key, value) {
  var step = { id : id};

  if (value === undefined) { value = '___undefined'; }
  step[key] = value;
  return step;
}

Program.prototype.addStep = function (name, key, value) {

  if (typeof name === 'number') { var id = name; } 
  else { var id = this.getId(name); }

  var step = this.makeStep(id, key, value);
  this.programSteps.push(step);
}



//----------------------------------------------------------------------------------
// Component methods
Program.prototype.makeComponent = function (type, name) {
  var id = this.components.length;
  var component = {
    id: id,
    type: type,
    name: name,
    block: this.getCurrentBlock(),
    scope: this.getCurrentScope(),
    createdAt: this.programSteps.length
  }
 return component;
}

Program.prototype.addComponent = function (type, name) {
  var component = this.makeComponent(type, name);
  this.components.push(component);
  return component;
}

Program.prototype.instantiate = function (name, key, value) {
  var id = this.components.length;
  
  var component = this.addComponent('var', name);
  this.addStep(id, key, value);

  this.scopes[this.getCurrentScope()][name] = component.id;
  return component;
}



//----------------------------------------------------------------------------------
// Get methods
Program.prototype.getId = function (name) {
  var id;

  // Search for the object in a given scope
  var searchScope = function (scope) {
    if (this.scopes[scope][name]) {
      id = this.scopes[scope][name];
    } else if (scope > 0) {
      var parentScope = this.components[scope].scope;
      searchScope(parentScope);
    }
  }.bind(this);
  searchScope(this.getCurrentScope());

  return id;
}

Program.prototype.getComponent = function (id) {
  return this.components[id] || 0;
}


//----------------------------------------------------------------------------------
// Loop / if block operators
Program.prototype.openBlock = function (type, value) {
  var id = this.components.length;
  var component = this.makeComponent('block', type);

  // Add number of branches for if statement
  if (type === 'if') {
    component.paths = value;
  }
  this.components.push(component);
  this.addStep(id, type, value);

  this._blockStack.push(id);
}

Program.prototype.cycleBlock = function () {
  var id = this.getCurrentBlock();
  var type = this.getComponent(id).name;
  this.addStep(id, type, 'cycle');
}

Program.prototype.closeBlock = function () {
  var id = this.getCurrentBlock();
  var type = this.getComponent(id).name;
  this.addStep(id, type, 'close');

  this._blockStack.pop();  
}

Program.prototype.enterPath = function (value) {
  var id = this.getCurrentBlock();
  var type = this.getComponent(id).name;
  this.addStep(id, 'enter', value);
}





//----------------------------------------------------------------------------------
// External methods of the ___Program object
Program.prototype.set = function (name, value, right) {
  if (typeof value === 'object') {
    var rightId = this.getId(right);
    var pointerId = this.lastIdOfObject(rightId);

    if ( !this.getId(name) ) {
      this.instantiate(name, 'pointer', pointerId);
    } else {
      this.addStep(name, 'pointer', pointerId);
    }

  } else {
    if ( !this.getId(name) ) {
      this.instantiate(name, 'value', value);
    } else {
      this.addStep(name, 'value', value);
    }
  }

}

Program.prototype.param = function (name, value) {
  this.instantiate(name, 'param', value);
}

Program.prototype.loop = function (type, state) {
  this.setScope();
  if (state === 'open') {
    this.openBlock(type, state);
  } else if (state === 'cycle') {
    this.cycleBlock();
  } else if (state === 'close') {
    this.closeBlock();
  }
}

Program.prototype.block = function (type, state) {
  this.setScope();
  if (type === 'if') {
    if (state === 'close') {
      this.closeBlock();
    } else {
      this.openBlock(type, state);
    }
  }
}

Program.prototype.enter = function (type, value) {
  if (type === 'if') {
    this.enterPath(value);
  }
}

Program.prototype.function = function (name, fn) {
  if ( !this.getId(name) ) {
    this.instantiate(name, 'value', '___function code');
  } else {
    this.addStep(name, 'value', '___function code');
  }  
}

Program.prototype.invoke = function (name) {
  var id = this.components.length;
  var component = this.makeComponent('invoke', name);
  component.function = this.getFunctionId(name);
  this.components.push(component);

  this.addStep(id, 'invoke', name);

  this._scopeStack.push(component.id);
  this._currentScope = component.id;;
  this.scopes[component.id] = {};
}

Program.prototype.method = function(name) {
  this.invoke(name);
}



//----------------------------------------------------------------------------------
// Id acquisition from the scope stack / scope chain / Object reference chain
Program.prototype.getFunctionId = function (functionName) {
  var id;

  var traverse = function (scopeId) {
    var scope = this.scopes[scopeId]
    if (scope[functionName]) {
      id = scope[functionName];
    } else {
      var nextScope = this.getComponent(scopeId).scope;
      traverse(nextScope);
    }
  }.bind(this);

  traverse( this.getCurrentScope() );
  return id;
}

Program.prototype.lastIdOfObject = function (parentId) {
  for (var i = this.programSteps.length - 1; i >= 0; i--) {
    var step = this.programSteps[i];
    if (step.id === parentId) {
      return step.pointer;
    }
  }
}

//----------------------------------------------------------------------------------
// Object comprehension methods
Program.prototype.array = function(name, arr, arrayMap) {
  this.object(name, arr, arrayMap);
}

Program.prototype.object = function(name, obj, map) {

  var type = Array.isArray(obj) ? 'array' : 'object';

  var map = JSON.parse(map);
  var newObject = this.addComponent(type);

  var found = this.getId(name);
  if (!found) {
    var variable = this.instantiate(name, 'pointer', newObject.id);
  } else {
    this.addStep(found, 'pointer', newObject.id);
  }

  var traverseObjectKeys = function(name, obj, parent, map) {
    var type = Array.isArray(obj) ? 'array' : 'object';

    if (type === 'array') {
      this.addStep(parent.id, 'length', obj.length);
    }

    for (var key in obj) {
      var propertyName = name + '[' + key + ']';
      if (Array.isArray(obj)) {
        var memberName = 'element';   
      } else {
        var memberName = 'property';
      }  

      var property = obj[key];

      if ( Array.isArray(property) ) {

        var variableId = this.getId(map[key]);
        if (variableId) {
          var pointerId = this.lastIdOfObject(variableId);
        } else {
          var childArray = this.addComponent('array');
          var pointerId = this.components.length - 1;
        }

        var component = this.instantiate(propertyName, 'pointer', pointerId);
        component.name = key;
        component.type = memberName;
        component.parent = parent.id;
        var nextMap = map[key];

        traverseObjectKeys(propertyName, property, childArray, nextMap);
      } else if (typeof property === 'object') {

        var variableId = this.getId(map[key]);
        if (variableId) {
          var pointerId = this.lastIdOfObject(variableId);
        } else {
          var childObject = this.addComponent('object');
          var pointerId = this.components.length - 1;
        }

        var component = this.instantiate(propertyName, 'pointer', pointerId);
        component.name = key;
        component.type = memberName;
        component.parent = parent.id;
        var nextMap = map[key];

        traverseObjectKeys(propertyName, property, childObject, nextMap);
      } else if (typeof property === 'function') {

        var component = this.instantiate(propertyName, 'value', '___function code');
        component.name = key;
        component.type = memberName === 'property' ? 'method' : 'element';
        component.parent = parent.id;
      } else {
        var component = this.instantiate(propertyName, 'value', property);
        component.name = key;
        component.type = memberName;
        component.parent = parent.id;
      }


    }
  }.bind(this);
  traverseObjectKeys(name, obj, newObject, map);
}


Program.prototype.setObjectProperty = function (object, parent, right) {


  var id = this.getId(object);

  var parentObject = object.substring(0, object.lastIndexOf('['));
  var key = object.substring(object.lastIndexOf('[') + 1, object.length - 1);
  var parentId = this.lastIdOfObject( this.getId(parentObject) );
  var value = parent[key];
  
   // Check to see if the object property being set is already defined
  if (id) {
    if (this.components[id].type === 'var') { 

      this.components[id].type = 'property';
      this.components[id].name = key;
      this.components[id].parent = parentId;

    // this.addStep(this.components.length + 1, 'pointer', value);
    } else if (typeof value === 'object') {
      var rightId = this.getId(right);
      var pointerId = this.lastIdOfObject(rightId);
      this.addStep(this.components.length + 1, 'pointer', value);
    } else {
      this.addStep(id, 'value', value);
    }
  } 
  else {
    // Object/property was not found, therefor a new property is being defined.
    if (this.components[parentId].type === 'array') {
      var memberName = 'element';
    } else {
      var memberName = 'property';
    }

    if (typeof value === 'object') {
      var rightId = this.getId(right);
      var pointerId = this.lastIdOfObject(rightId);

      var component = this.instantiate(object, 'pointer', pointerId);
      component.name = key;
      component.type = memberName;
      component.parent = parentId;
    } else if (typeof value === 'function') {
      var component = this.instantiate(object, 'value', '___function code');
      component.name = key;
      component.type = memberName === 'property' ? 'method': '___anonymous'
      component.parent = parentId;
    } else {
      var component = this.instantiate(object, 'value', value);
      component.name = key;
      component.type = memberName;
      component.parent = parentId;
    }
  }

  this.monitorArrayLength(parent, parentId);

}

// Program.prototype.setObjectProperty = function (object, value, right) {
//   var id = this.getId(object);

//   var parentObject = object.substring(0, object.lastIndexOf('['));
//   var key = object.substring(object.lastIndexOf('[') + 1, object.length - 1);
//   var parentId = this.lastIdOfObject( this.getId(parentObject) );

//   // this.monitorArrayLength(parentObject, parentId);
  
//    // Check to see if the object property being set is already defined
//   if (id) {
//     if (this.components[id].type === 'var') { 

//       this.components[id].type = 'property';
//       this.components[id].name = key;
//       this.components[id].parent = parentId;

//     // this.addStep(this.components.length + 1, 'pointer', value);
//     } else if (typeof value === 'object') {
//       var rightId = this.getId(right);
//       var pointerId = this.lastIdOfObject(rightId);
//       this.addStep(this.components.length + 1, 'pointer', value);
//     } else {
//       this.addStep(id, 'value', value);
//     }
//   } 
//   else {
//     // Object/property was not found, therefor a new property is being defined.
//     if (this.components[parentId].type === 'array') {
//       var memberName = 'element';
//     } else {
//       var memberName = 'property';
//     }

//     if (typeof value === 'object') {
//       var rightId = this.getId(right);
//       var pointerId = this.lastIdOfObject(rightId);

//       var component = this.instantiate(object, 'pointer', pointerId);
//       component.name = key;
//       component.type = memberName;
//       component.parent = parentId;
//     } else if (typeof value === 'function') {
//       var component = this.instantiate(object, 'value', '___function code');
//       component.name = key;
//       component.type = memberName === 'property' ? 'method': '___anonymous'
//       component.parent = parentId;
//     } else {
//       var component = this.instantiate(object, 'value', value);
//       component.name = key;
//       component.type = memberName;
//       component.parent = parentId;
//     }


//   }
// }

Program.prototype.monitorArrayLength = function (parent, parentId) {
  if (Array.isArray(parent)) {
    this.addStep(parentId, 'length', parent.length);
  }
}

//----------------------------------------------------------------------------------
// Function return methods
Program.prototype.return = function (name) {
  var id = this.getCurrentScope();

  this.addStep(id, 'return', this.returnState)

  this._scopeStack.pop();
  this.resetBlock();
}

Program.prototype.resetBlock = function () {
  var top = this.getCurrentBlock();

  var block = this.getComponent(top);
  if ( block !== 0 ) {
    if ( block.scope !== this.getCurrentScope() ) {
      this._blockStack.pop();
      this.resetBlock();
    }
  }
}



module.exports = Program;