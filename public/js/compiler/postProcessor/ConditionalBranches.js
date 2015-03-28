var ConditionalBranches = function (element, data) {
  var blueprint = data.blueprint;

  var tree = getSubTree (blueprint.tree, element.codeId);
  element.conditionalBranches = getConditionalBranches(element, tree);

  return element;
}

module.exports = ConditionalBranches;




var getConditionalBranches = function (element, tree) {
  var path = 0;
  var conditionalBranches = [];

  while (path < element.paths) {
    var conditional = {
      enter: false
    };
    conditionalBranches.push(conditional)
    path++;
  }

  return conditionalBranches;
}


var getSubTree = function (tree, id) {
  var found;
  var traverse = function (tree) {
    if (tree.id === id) {
      return found = tree;
    }
    if (!found) {
      for (var i = 0; i < tree.children.length; i++) {
        traverse(tree.children[i]);
      }
    }
  }
  traverse (tree);
  return found;
}