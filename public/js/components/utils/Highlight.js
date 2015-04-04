var Highlight = {};

Highlight.getRange = function (highlight, blueprint) {
  if (blueprint && highlight.id) {
    var codeElement = blueprint.list[highlight.id]
    console.log( codeElement );

    if (codeElement.type === 'BlockStatement') {
      var parent = codeElement.___parent;

      if (parent.type === 'IfStatement') {
        highlight.id = parent.consequent.___id;
      }
    }



    return codeElement.range;
  }
}


module.exports = Highlight;