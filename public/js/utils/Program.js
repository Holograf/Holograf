var Program = function () {
  this.programSteps = [];
  this.components = [];
  this.scopes = {
    '0': {}
  };
  this._currentScope = 0;
  this._blocks = [0];
  this.baseTime = window.performance.now();
}

Program.prototype.getCurrentBlock = function () {
  return this._blocks[this._blocks.length - 1];
}

Program.prototype.makeStep = function (id, value) {
  return {
    id: id,
    value: value,
    time: window.performance.now() - this.baseTime
  }  
}

Program.prototype.addComponent = function (type, name, value) {
  var id = this.components.length + 1;
  var component = {
    id: id,
    type: type,
    name: name,
    block: this.getCurrentBlock(),
    scope: this._currentScope
  }
  var step = this.makeStep(id, value);

  this.components.push(component);
  this.programSteps.push(step);

  return component;
} 

Program.prototype.find = function (name) {
  return !!this.scopes[this._currentScope][name];
}

Program.prototype.instantiate = function (name, value) {
  var component = this.addComponent('var', name, value);
  this.scopes[this._currentScope][name] = component.id;
}

Program.prototype.getId = function (name) {
  var id;

  // Search for the object in a given scope
  var searchScope = function (scope) {
    if (this.scopes[this._currentScope][name]) {
      id = this.scopes[this._currentScope][name];
    } else if (scope > 0) {
      var parentScope = this.components[scope - 1].scope;
      searchScope(parentScope);
    }
  }.bind(this);
  searchScope(this._currentScope);
  return id;
}

Program.prototype.addStep = function (name, value) {
  var id = this.getId(name);
  var step = this.makeStep(id, value);

  this.programSteps.push(step);
}

Program.prototype.openBlock = function (type, state) {
  var id = this.components.length + 1;
  var component = {
    id: id,
    type: 'block',
    name: type,
    block: this.getCurrentBlock(),
    scope: this._currentScope
  }
  var step = this.makeStep(id, state);

  this.components.push(component);
  this.programSteps.push(step);
  this._blocks.push(id);
}

Program.prototype.cycleBlock = function () {
  var step = this.makeStep(this.getCurrentBlock(), 'cycle');

  this.programSteps.push(step);
}

Program.prototype.closeBlock = function () {
  var step = this.makeStep(this.getCurrentBlock(), 'close');

  this.programSteps.push(step);
  this._blocks.pop();  
}

Program.prototype.set = function (name, value) {
  if ( !this.find(name) ) {
    this.instantiate(name, value);
  } else {
    this.addStep(name, value);
  }
}

Program.prototype.loop = function (type, state) {
  if (state === 'open') {
    this.openBlock(type, state);
  } else if (state === 'cycle') {
    this.cycleBlock();
  } else if (state === 'close') {
    this.closeBlock();
  }
}

module.exports = Program;