var Tree = require('./utils/TreeHelpers');

var Program = function () {
  this.timeline = [];
  this.components = [];
  this.scopes = {
    '0': {}
  };
  this._objects = {};
  this._invocationPoints = [];
  this._currentScope = 0;
  this._blockStack = [0];
  this._scopeStack = [0];
  this._code = '';

  this.initialize();
}


//----------------------------------------------------------------------------------
// Initialization and getter for the AppStore to access the relevant data properties
Program.prototype.initialize = function () {
  this.addComponent('block', 'global');
}

Program.prototype.getData = function () {
  return {
    timeline: this.timeline,
    components: this.components,
    scopes: this.scopes,
    code: this._code,
    wrappedCode: this._wrappedCode,
    syntaxTree: this._syntaxTree,
    blueprint: this._blueprint
  }
}

Program.prototype.setCode = function (rawCode) {
  this._code = rawCode;
}

Program.prototype.setSyntaxTree = function (syntaxTree) {
  this._syntaxTree = syntaxTree;
  this._blueprint = syntaxTree.___blueprint;
}

//----------------------------------------------------------------------------------
// Object tracking methods
Program.prototype.registerObject = function (object) {
  var id = this.components.length;
  Object.defineProperty(object, '___id', { enumerable: false, value: id, writable: true });
  Object.defineProperty(object, '___parsed', { enumerable: false, value: false, writable: true });

  if (Array.isArray(object)) {
    var component = this.addComponent('array');
  } else  {
    var component = this.addComponent('object');
  }
  this._objects[id] = {};
}

Program.prototype.newFunctionId = function () {
  return this.components.length;
}

Program.prototype.registerFunction = function (fn) {
  var id = this.components.length;

  Object.defineProperty(fn, '___id', { enumerable: false, value: id, writable: true });

  this.addComponent('function');
  return id;
}

Program.prototype.registerObjectProperties = function (object, codeId) {
  var type = Array.isArray(object) ? 'element' : 'property';
  this.objectSnapshot(object, codeId);

  for (var key in object) {
    var value = object[key];

    var component = this.addComponent(type, key);
    component.parent = object.___id;

    if (typeof value === 'object') {
      var step = this.addStep({'id': component.id, 
                               'pointer': value.___id, 
                               'codeId': codeId });
      this._objects[component.parent][key] = {};
      this.registerObjectProperties(value, codeId);
    } else if (typeof value === 'function') {
      var step = this.addStep({'id': component.id, 
                               'pointer': value.___id, 
                               'codeId': codeId });
      this._objects[component.parent][key] = component.id;
    } else {
      var step = this.addStep({'id': component.id, 
                              'value': value, 
                              'codeId': codeId });
      this._objects[component.parent][key] = component.id;
    }

  }

  object.___parsed = true;
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
// Program.prototype.makeStep = function (id, key, value) {
Program.prototype.makeStep = function (options) {
  var step = {
    block: this.getCurrentBlock()
  };

  for (var key in options) {
    if (key  === 'value' && options[key] === undefined) {
      step[key] = '___undefined';
    } else {
      step[key] = options[key]   
    }
  }

  // if (value === undefined) { value = '___undefined'; }
  // step[key] = value;
  return step;
}
// Program.prototype.addStep = function (name, key, value, codeId) {

Program.prototype.addStep = function (options) {

  // if (typeof name === 'number') { var id = name; } 
  // else { var id = this.getId(name); }

  var step = this.makeStep(options);
  this.timeline.push(step);

  return step;
}



//----------------------------------------------------------------------------------
// Component methods
Program.prototype.makeComponent = function (type, name) {
  var id = this.components.length;
  var component = {
    id: id,
    type: type,
    name: name,
    scope: this.getCurrentScope()
  }
 return component;
}

Program.prototype.addComponent = function (type, name) {
  var component = this.makeComponent(type, name);
  this.components.push(component);
  return component;
}

Program.prototype.instantiate = function (options) {
  
  var component = this.addComponent('var', options.name);
  options.id = component.id
  this.addStep(options);

  this.scopes[this.getCurrentScope()][options.name] = component.id;
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
Program.prototype.openLoop = function (type, codeId) {
  var id = this.components.length;
  var component = this.addComponent('block', type);
  
  var step = this.addStep({'id': id, 
                           'loop': 'open', 
                           'type': type,
                           'codeId': codeId });

  this._blockStack.push(id);
}

Program.prototype.closeLoop = function (type, codeId) {
  var id = this.getCurrentBlock();

  var step = this.addStep({'id': id, 
                           'loop': 'close',
                           'type': type,
                           'codeId': codeId });

  this._blockStack.pop();  
}

Program.prototype.cycleLoop = function (type, codeId) {
  var id = this.getCurrentBlock();

  var step = this.addStep({'id': id, 
                           'loop': 'cycle',
                           'type': type, 
                           'codeId': codeId });
}


Program.prototype.openIf = function (value, codeId) {
  var id = this.components.length;
  var component = this.makeComponent('block', 'if');

  // Add number of branches for if statement
  component.paths = value;
  this.components.push(component);
  
  var step = this.addStep({'id': id, 
                           'if': 'open',
                           'paths': value, 
                           'codeId': codeId });

  this._blockStack.push(id);
}


Program.prototype.closeIf = function (value, codeId) {
  var id = this.getCurrentBlock();

  // Cycle back to inject an 'enter' step if none is found to indicate bypassing the if
  var index = this.timeline.length - 1;
  var entered = false;
  var opened = false;
  while (opened === false) {
    index--;
    opened = (this.timeline[index].if === 'open' && this.timeline[index].id === id);

    if (this.timeline[index].enter !== undefined && this.timeline[index].id === id) {
      entered = true;
      break;
    }
  }
  if (!entered) {
    var step = this.addStep({'id': id, 
                             'enter': this.getComponent(id).paths, 
                             'codeId': codeId });
  }

  var step = this.addStep({'id': id, 
                           'if': 'close', 
                           'codeId': codeId });

  this._blockStack.pop(); 
}


Program.prototype.enterIf = function (value, codeId) {
  var id = this.getCurrentBlock();
  var step = this.addStep({'id': id, 
                           'enter': value, 
                           'codeId': codeId });
}


Program.prototype.createConditionalBranches = function (value, codeId) {
  var paths = value;
  var path = 0;
  var branch = Tree.getSubTree (this._blueprint.tree, codeId);

  var traverseConditional = function (branch) {
    for (var i = 0; i < branch.children.length; i++) {
      var child = branch.children[i];

      if (child.node.___origin === 'consequent') {
        consequent = child;
        var step = this.addStep({'id': this.getCurrentBlock(), 
                                 'branch': path++, 
                                 'codeId': consequent.id });
        step.paths = paths;

      } else if (child.node.___origin === 'alternate') {
        alternate = child;

        if (alternate.node.consequent) {
          traverseConditional(alternate);
        } else {
          var step = this.addStep({'id': this.getCurrentBlock(), 
                                   'branch': path++,
                                   'codeId': alternate.id });
          step.paths = paths;
        }
      }
    }
  }.bind(this);
  traverseConditional(branch);

  var step = this.addStep({'id': this.getCurrentBlock(), 
                           'branch': path++, 
                           'codeId': codeId });
  step.paths = paths;
}






//----------------------------------------------------------------------------------
// External methods of the ___Program object
Program.prototype.set = function (name, value, codeId, param) {
  if (value && typeof value === 'object') {
    var objectId = value.___id;
    if ( !this.getId(name) ) {
      var component = this.instantiate({'name': name, 
                                        'pointer': objectId, 
                                        'codeId': codeId });
      component.type = param || 'var';
    } else {
      var step = this.addStep({'name': name, 
                               'pointer': objectId, 
                               'codeId': codeId });
    }
    if (!value.___parsed) {
      this.registerObjectProperties(value, codeId);
    }

  } else if (typeof value === 'function') {
    var functionId = value.___id;
    if ( !this.getId(name) ) {
      var component = this.instantiate({'name': name, 
                                        'pointer': functionId, 
                                        'codeId': codeId });
      component.type = param || 'var';
    } else {
      var step = this.addStep({'name': name, 
                               'pointer': functionId, 
                               'codeId': codeId });
    }
  } else {
    if (param) {
      var component = this.instantiate({'name': name, 
                                        'value': value, 
                                        'codeId': codeId });
      component.type = 'param';
    } else if ( !this.getId(name) ) {
      var component = this.instantiate({'name': name, 
                                        'value': value, 
                                        'codeId': codeId });
    } else {
      var step = this.addStep({'name': name, 
                               'value': value, 
                               'codeId': codeId });
    }
  }

}

Program.prototype.param = function (name, value, codeId) {
  this.set(name, value, codeId, 'param');
}

Program.prototype.loop = function (type, state, codeId) {
  this.setScope();
  if (state === 'open') {
    this.openLoop(type, codeId);
  } else if (state === 'cycle') {
    this.cycleLoop(type, codeId);
  } else if (state === 'close') {
    this.closeLoop(type, codeId);
  }
}

Program.prototype.if = function (state, value, codeId) {
  this.setScope();
  if (state === 'close') {
    this.closeIf(value, codeId);
  } else if (state === 'open') {
    this.openIf(value, codeId);
    this.createConditionalBranches(value, codeId);
  } else if (state === 'enter') {
    this.enterIf(value, codeId); 
  }
}

Program.prototype.invoke = function (functionId) {
  var codeId = this._invocationPoints.pop();
  var component = this.makeComponent('invoke', this.getFunctionName(functionId));
  component.function = functionId;
  this.components.push(component);

  var step = this.addStep({'id': component.id, 
                           'invoke': functionId, 
                           'codeId': codeId });

  this._scopeStack.push(component.id);
  this._currentScope = component.id;;
  this.scopes[component.id] = {};
}

Program.prototype.setInvocationPoint = function (codeId) {
  this._invocationPoints.push(codeId);
}

Program.prototype.method = function(name, codeId) {
  this.invoke(name, codeId);
}

Program.prototype.getFunctionName = function (functionId) {
  for (var i = this.timeline.length - 1; i >= 0; i--) {
    var step = this.timeline[i];
    if (step.pointer === functionId) {
      console.log('components', JSON.stringify(this.components, null, 2))
      console.log('steps', JSON.stringify(this.timeline, null, 2))
      return this.components[step.id].name;
    }
  }
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
  for (var i = this.timeline.length - 1; i >= 0; i--) {
    var step = this.timeline[i];
    if (step.id === parentId) {
      return step.pointer;
    }
  }
}

//----------------------------------------------------------------------------------
// Object comprehension methods
Program.prototype.setObjectProperty = function (parent, key, codeId) {
  
  var value = parent[key];
  var parentId = parent.___id;
  var pointerId = value.___id;

  var id = this._objects[parentId][key];
  
   // Check to see if the object property being set is already defined
  if (id) {
    if (this.components[id].type === 'var') { 

      this.components[id].type = 'property';
      this.components[id].name = key;
      this.components[id].parent = parentId;
    } else if (typeof value === 'object' || typeof value === 'function') {
      var step = this.addStep({'id': this.components.length + 1, 
                               'pointer': pointerId, 
                               'codeId': codeId });
    } else {
      var step = this.addStep({'id': id, 
                               'value': value, 
                               'codeId': codeId });
    }
  } 
  else { // Object/property was not found, therefor a new property is being defined.
    var memberName = this.components[parentId].type === 'array' ? 'element' : 'property';

    if (value && typeof value === 'object') {
      var component = this.addComponent(key, 'pointer', pointerId, codeId);
      var step = this.addStep({'id': component.id, 
                               'pointer': pointerId, 
                               'codeId': codeId });
      component.name = key;
      component.type = memberName;
      component.parent = parentId;
    } else if (typeof value === 'function') {
      var component = this.addComponent(key, 'pointer', pointerId, codeId);
      var step = this.addStep({'id': component.id, 
                               'pointer': pointerId, 
                               'codeId': codeId });
      component.name = key;
      component.type = memberName === 'property' ? 'method': 'function'
      component.parent = parentId;
    } else {
      var component = this.addComponent(key, 'value', value, codeId);
      var step = this.addStep({'id': component.id, 
                               'value': value, 
                               'codeId': codeId });
      component.name = key;
      component.type = memberName;
      component.parent = parentId;
    }
  }

  this.objectSnapshot(parent, codeId);
}

Program.prototype.objectSnapshot = function (object, codeId) {

  // console.log('object snapshot!', codeId);

  if (Array.isArray(object)) {
    var step  = this.addStep({'id': object.___id, 
                              'length': object.length, 
                              'snapshot': JSON.stringify(object), 
                              'codeId': codeId });
  } else if (object && typeof object === 'object') {
    var step  = this.addStep({'id': object.___id, 
                              'snapshot': JSON.stringify(object), 
                              'codeId': codeId });
  }
}



//----------------------------------------------------------------------------------
// Function return methods
Program.prototype.return = function (name, codeId) {
  var id = this.getCurrentScope();

  var step = this.addStep({'id': id,
                           'return': this.returnState, 
                           'codeId': codeId });
  if (this.returnState && typeof this.returnState === 'object') {
    step.return = { 
      pointer: this.returnState.___id,
      snapshot: JSON.stringify(this.returnState)
    }
  } else if (typeof this.returnState === 'function') {
    step.return = {
      pointer: this.returnState.___id
    }
  } else {
    if (this.returnState === undefined) { this.returnState = '___undefined' }
    step.return = { value: this.returnState };
  }

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








//----------------------------------------------------------------------------------
// Special Built-In method handling
Program.prototype.nativeArrayPush = function (array) {
  if (array.___id) {
    // var element = this.addArrayElementComponent(array, array.length - 1);
    // var value = array[array.length - 1];
    // this.addArrayElementStep(element, value);
    this.objectSnapshot(array);
    this.updateArrayValues(array);
  }
}

Program.prototype.nativeArrayPop = function (array) {
  if (array.___id) {
    this.objectSnapshot(array);
  }
}

Program.prototype.nativeArrayShift = function (array) {
  if (array.___id) {
    this.updateArrayValues(array);
    this.objectSnapshot(array);
  }
}

Program.prototype.nativeArrayUnshift = function (array) {
  if (array.___id) {
    this.updateArrayValues(array);
    this.objectSnapshot(array);
  }
}

Program.prototype.nativeArraySplice = function (array) {
  if (array.___id) {
    this.updateArrayValues(array);
    this.objectSnapshot(array);
  }
}


//----------------------------------------------------------------------------------
// Special Built-In method helpers
Program.prototype.updateArrayValues = function (array) {
  var lastIndex = 0;
  
  for (var i = 0; i < this.components.length; i++) {
    var element = this.components[i];
    if (element.parent === array.___id && element.name < array.length) {
      var value = array[element.name];
      this.addArrayElementStep(element, value);
      if ((element.name * 1) > lastIndex) { lastIndex = (element.name * 1); }
    }
  }

  for (var j = lastIndex + 1; j < array.length; j++) {
    var value = array[j];
    var element = this.addArrayElementComponent(array, j)
    this.addArrayElementStep(element, value);
  }
}

Program.prototype.addArrayElementComponent = function (array, elementNumber) {
  var element = this.addComponent('element', elementNumber);
  element.parent = array.___id;
  var accessorName = this.getComponent( array.___accessor ).name;
  var elementName = accessorName + '[' + (elementNumber) + ']';
  this.scopes[this.getCurrentScope()][elementName] = element.id;

  return element;
}

Program.prototype.addArrayElementStep = function (element, value, codeId) {
  if (value && (typeof value === 'object' || typeof value === 'function')) {
    var step = this.addStep({'id': element.id, 
                             'pointer': value.___id, 
                             'codeId': codeId });
  } else {
    var step = this.addStep({'id': element.id, 
                             'value': value, 
                             'codeId': codeId });
  } 
}

module.exports = Program;