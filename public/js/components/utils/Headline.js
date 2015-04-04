var Headline = {};


Headline.generate = function (component) {
  if (component) {
    
    var type = component.type;
    var headline = '';

    if (Headline.type[component.type]) {
      return Headline.type[component.type](component) 
    } else {
      return '';
    }

  }
}

module.exports = Headline;


Headline.type = {}

Headline.type.var = function (component) {
  var value = getValue(component);
  return 'variable: ' + component.name + ' = ' + value;   
}

Headline.type.invoke = function (component) {
  if (component.return) {
    var value = component.return.value;
    if (typeof value === 'string') {
      value = "'" + value + "'";
    }
    if (component.return.pointsTo) {
      var value = component.return.pointsTo.type;
    }
    return 'function: ' + component.name + ' returns ' + value;
  } 
  else {
    return 'function: ' + component.name + ' invocation';
  }
}

Headline.type.param = function (component) {
  var value = getValue(component);
  return 'argument: ' + component.name + ' = ' + value;
}

Headline.type.block = function (component) {
  if (component.name === 'if') {
    return Headline.type.if(component);
  } else {
    return Headline.type.loop(component);
  }
}

Headline.type.if = function (component) {
  if (component.if === 'open') {
    return 'if block open';
  } else if (component.if === 'close') {
    return 'if block close';
  } else if (component.branch !== undefined) {
    return 'if statement';
  }
}

Headline.type.loop = function (component) {
  if (component[component.name] === 'open') {
    return component.name + ' loop open';
  } else if (component[component.name] === 'close') {
    return component.name + ' loop close';
  } else if (component[component.name] === 'cycle') {
    return component.name + ' loop cycle';
  }
}


function getValue (component) {
  var value = component.value;
  if (typeof value === 'string') {
    value = "'" + value + "'";
  }
  if (component.pointsTo) {
    if (component.pointsTo.type === 'function') {
      value = 'function';
    } else if (component.pointsTo.type === 'object') {
      value = 'object';
    } else if (component.pointsTo.type === 'array') {
      value = 'array';
    } 
  }
  return value;
}





