var TreeHelpers = {}

TreeHelpers.getSubTree = function (tree, id) {
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


module.exports = TreeHelpers;