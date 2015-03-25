var esprimaParse = require('esprima').parse;
var Promise = require('bluebird');
var generateCode = require('escodegen').generate;
var Traverse = require('./Traverse');

var blueprint = [];

var Blueprint = function (code) {

  return new Promise (function (resolve, reject) {

    var syntaxTree = esprimaParse(code, {loc: true});

    var processes = {
      program: registerProgram,
      node: registerNode
    }

    var traverse = new Traverse(processes);
    traverse.start(syntaxTree);

    Object.defineProperty(syntaxTree, '___blueprint', { enumerable: true, value: blueprint });

    console.log(esprimaParse(code));

    resolve(syntaxTree);
  })
};


var registerProgram = function (node) {
  Object.defineProperty(node, '___id', { enumerable: true, value: 0, writable: true });
  blueprint.push(node);
}

var registerNode = function (node, parent, origin, index, arrayIndex) {

  var ___parent = parent;
  var ___parentId = parent.___id;
  var ___id = blueprint.length;

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

  blueprint.push(node);
}



module.exports = Blueprint;