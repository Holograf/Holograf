module.exports = function (data) {
  var scopes = {'-1': 0};
  var scopeX = 1;
  
  var countLevels = function(key, levels) {
    levels = levels || 1;
    var scope = data.components[key].scope;
    if (scope === 0) {
      return levels;
    }
    levels++;
    return countLevels(scope, levels);
  }

  for (var key in data.scopes){
    if (key !== '0') {
      level = countLevels(key);
      if (!scopes[level]) {
        scopes[level] = scopeX;
        scopeX += 1;
      }
    }
  }
  return scopes;
};