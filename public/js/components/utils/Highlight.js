var Highlight = {};

Highlight.getRange = function (highlight, blueprint) {
  if (blueprint && highlight.id) {
    var codeElement = blueprint.list[highlight.id]
    var highlightRange = codeElement.range;
    var parent = codeElement.___parent;
    console.log( codeElement );

    if (codeElement.type === 'BlockStatement') {

      if (parent.type === 'IfStatement') {
        highlightRange[0] = parent.range[0];

        if (codeElement.___origin === 'alternate') {
          highlightRange[0] = parent.consequent.range[1];
        } else if (parent.___origin === 'alternate') {
          highlightRange[0] = parent.___parent.consequent.range[1];
        }
      }
    }

    if (codeElement.type === 'VariableDeclarator') {
      if (parent.declarations.length === 1) {
        highlightRange[0] = parent.range[0];
      }
    }



    return codeElement.range;
  }
}


module.exports = Highlight;