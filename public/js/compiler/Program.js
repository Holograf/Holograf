var Program = function () {
  this.programSteps = [];
  this.components = [];
  this.scopes = {
    '0': {}
  };
  this._currentScope = 0;
  this._blockStack = [0];
  this._scopeStack = [0];
  this.baseTime = window.performance.now();

  this.initialize();
}

Program.prototype.initialize = function () {
  var global = this.makeComponent('block', 'global');
  this.components.push(global);
}


Program.prototype.getData = function () {
  return {
    programSteps: this.programSteps,
    components: this.components,
    scopes: this.scopes
  }
}

Program.prototype.getCurrentScope = function () {
  // Check to see if the current scope is being modified by a pending function return
  this.setScope();
  return this._currentScope;
}
  
Program.prototype.getCurrentBlock = function () {
  return this._blockStack[this._blockStack.length - 1];
}

Program.prototype.makeStep = function (id, method, value) {
  var step = {};
  step.id = id;

  // Check to see if the value is an object - if so, copy it deeply
  if (typeof value === 'object') {
    value = JSON.parse(JSON.stringify(value))
  }
  step[method] = value;
  // step.time = window.performance.now() - this.baseTime; 
  return step;
}

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


Program.prototype.find = function (name) {
  return !!this.scopes[this.getCurrentScope()][name];
}

Program.prototype.instantiate = function (name, method, value) {
  var id = this.components.length;
  
  var component = this.makeComponent('var', name);
  this.components.push(component);

  var step = this.makeStep(id, method, value);
  this.programSteps.push(step);

  this.scopes[this.getCurrentScope()][name] = component.id;
}

Program.prototype.getId = function (name) {
  var id;

  // Search for the object in a given scope
  var searchScope = function (scope) {
    if (this.scopes[this.getCurrentScope()][name]) {
      id = this.scopes[this.getCurrentScope()][name];
    } else if (scope > 0) {
      var parentScope = this.components[scope - 1].scope;
      searchScope(parentScope);
    }
  }.bind(this);
  searchScope(this.getCurrentScope());
  return id;
}

Program.prototype.addStep = function (name, method, value) {

  if (typeof name === 'number') {
    var id = name;
  } else {
    var id = this.getId(name);
  }
  var step = this.makeStep(id, method, value);

  this.programSteps.push(step);
}

Program.prototype.openBlock = function (type, state) {
  var id = this.components.length;
  var component = this.makeComponent('block', type);

  // Add number of branches for if statement
  if (type === 'if') {
    component.paths = state;
  }
  this.components.push(component);

  var step = this.makeStep(id, type, state);
  this.programSteps.push(step);
  this._blockStack.push(id);
}

Program.prototype.cycleBlock = function () {
  var id = this.getCurrentBlock();
  var type = this.getComponent(id).name;
  var step = this.makeStep(id, type, 'cycle');

  this.programSteps.push(step);
}

Program.prototype.closeBlock = function () {
  var id = this.getCurrentBlock();
  var type = this.getComponent(id).name;
  var step = this.makeStep(id, type, 'close');

  this.programSteps.push(step);
  this._blockStack.pop();  
}

Program.prototype.enterPath = function (value) {
  var id = this.getCurrentBlock();
  var type = this.getComponent(id).name;
  var step = this.makeStep(id, 'enter', value);

  this.programSteps.push(step);
}

Program.prototype.set = function (name, value) {
  var method = 'value';
  if ( !this.find(name) ) {
    this.instantiate(name, method, value);
  } else {
    this.addStep(name, method, value);
  }
}

Program.prototype.param = function (name, value) {
  var method = 'param';
  this.instantiate(name, method, value);
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
  this.setScope();
  if (type === 'if') {
    this.enterPath(value);
  }
}

Program.prototype.function = function (name, fn) {
  if ( !this.find(name) ) {
    this.instantiate(name, 'value', '___function code');
  } else {
    this.addStep(name, 'value', '___function code');
  }  
}

Program.prototype.getFunctionDefinition = function (name) {

  var currentScope = this.getCurrentScope();
  var id;

  var traverse = function (scopeId) {
    var scope = this.scopes[scopeId]
    if (scope[name]) {
      id = scope[name];
    } else {
      var nextScope = this.getComponent(scopeId).scope;
      traverse(nextScope);
    }
  }.bind(this);

  traverse(currentScope)
  return id;
}

Program.prototype.invoke = function (name) {

  
  var id = this.components.length + 1;
  var component = this.makeComponent('invoke', name);
  component.function = this.getFunctionDefinition(name);
  this.components.push(component);

  var step = this.makeStep(id, 'invoke', name);
  this.programSteps.push(step);

  this._scopeStack.push(component.id);
  this._currentScope = component.id;;
  this.scopes[component.id] = {};
}


Program.prototype.return = function (name) {
  var id = this.getCurrentScope();

  this.addStep(id, 'return', this.returnState)

  this._scopeStack.pop();
  this.setBlock();
}

Program.prototype.getComponent = function (id) {
  return this.components[id] || 0;
}

Program.prototype.setBlock = function () {
  var top = this.getCurrentBlock();

  var block = this.getComponent(top);
  if ( block !== 0 ) {
    if ( block.scope !== this.getCurrentScope() ) {
      this._blockStack.pop();
      this.setBlock();
    }
  }
}

Program.prototype.setScope = function () {
  var top = this._scopeStack[this._scopeStack.length - 1];
  if (this.getCurrentScope !== top) {
    this._currentScope = top;
  }
}

module.exports = Program;