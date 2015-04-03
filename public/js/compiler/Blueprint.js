var esprimaParse = require('esprima').parse;
var Promise = require('bluebird');
var generateCode = require('escodegen').generate;
var Traverse = require('./Traverse');
var clone = require('clone');

var blueprint = {
  list: []
};

var Blueprint = function (code) {

  return new Promise (function (resolve, reject) {

    var syntaxTree = esprimaParse(code, {range: true});

    var processes = {
      program: registerProgram,
      node: registerNode
    }

    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);

    blueprint.tree = clone( constructBlueprintTree(blueprint.list) );


    Object.defineProperty(syntaxTree, '___blueprint', { enumerable: true, value: blueprint });

    resolve(syntaxTree);
  })
};


var registerProgram = function (node) {
  Object.defineProperty(node, '___id', { enumerable: true, value: 0, writable: true });
  blueprint.list.push(node);
}

var registerNode = function (node, parent, origin, index, arrayIndex) {

  var ___parent = parent;
  var ___parentId = parent.___id;
  var ___id = blueprint.list.length;

  Object.defineProperty(node, '___id', { enumerable: true, value: ___id});
  Object.defineProperty(node, '___parent', { enumerable: true, value: ___parent});
  Object.defineProperty(node, '___parentId', { enumerable: true, value: ___parentId});

  if (origin) {
    Object.defineProperty(node, '___origin', { enumerable: true, value: origin})
  }
  if (arrayIndex !== undefined) {
    Object.defineProperty(node, '___arrayIndex', { enumerable: true, value: arrayIndex })
  }

  // console.log( node.___id, node.type, node.___parentId, node.___origin ? node.___origin : '');
  blueprint.list.push(node);
}

var constructBlueprintTree = function (list) {
  var Leaf = function (id, parent) {
    this.id = id;
    this.parent = parent;
    this.children = [];
    this.node = list[this.id];
    this.type = this.node.type;
  }

  var tree = new Leaf(0);
  var topTree = tree;

  for (var i = 1; i < list.length; i++) {
    var node = list[i];
    
    while (tree.id !== node.___parentId) {
      tree = tree.parent;
    }
    var leaf = new Leaf(node.___id, tree);
    tree.children.push(leaf);
    tree = leaf;
  }

  return topTree;
}



module.exports = Blueprint;