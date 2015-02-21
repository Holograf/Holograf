var codeStubs = {}, stub;

var stringify = function (code) {
  var text = code.toString();
  text = text.substring(14, text.length - 2);
  return text.replace('\n', '');
}

// Variable Declarations

stub = codeStubs['declarations/variable_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/variable_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/variable_declaration').output );
stub.data = require('./codeSnippets/declarations/variable_declaration').data;

stub = codeStubs['declarations/boolean_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/boolean_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/boolean_declaration').output );
stub.data = require('./codeSnippets/declarations/boolean_declaration').data;

stub = codeStubs['declarations/undefined_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/undefined_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/undefined_declaration').output );
stub.data = require('./codeSnippets/declarations/undefined_declaration').data;

stub = codeStubs['declarations/implicit_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/implicit_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/implicit_declaration').output );
stub.data = require('./codeSnippets/declarations/implicit_declaration').data;


// // Simple expressions

stub = codeStubs['expressions/assignment'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/assignment').input );
stub.output = stringify( require('./codeSnippets/expressions/assignment').output );
stub.data = require('./codeSnippets/expressions/assignment').data;

stub = codeStubs['expressions/assignment_with_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/assignment_with_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/assignment_with_operator').output );
stub.data = require('./codeSnippets/expressions/assignment_with_operator').data;

stub = codeStubs['expressions/post-increment_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/post-increment_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/post-increment_operator').output );
stub.data = require('./codeSnippets/expressions/post-increment_operator').data;

stub = codeStubs['expressions/pre-increment_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/pre-increment_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/pre-increment_operator').output );
stub.data = require('./codeSnippets/expressions/pre-increment_operator').data;

stub = codeStubs['expressions/shorthand_expression_assignment_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/shorthand_expression_assignment_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/shorthand_expression_assignment_operator').output );
stub.data = require('./codeSnippets/expressions/shorthand_expression_assignment_operator').data;


// // Flow Control

// // Conditionals

stub = codeStubs['conditionals/if_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/if_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/if_statement').output );
stub.data = require('./codeSnippets/conditionals/if_statement').data;

stub = codeStubs['conditionals/if_else_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/if_else_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/if_else_statement').output );
stub.data = require('./codeSnippets/conditionals/if_else_statement').data;

stub = codeStubs['conditionals/if_else_if_else_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/if_else_if_else_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/if_else_if_else_statement').output );
stub.data = require('./codeSnippets/conditionals/if_else_if_else_statement').data;

stub = codeStubs['conditionals/nested_if_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/nested_if_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/nested_if_statement').output );
stub.data = require('./codeSnippets/conditionals/nested_if_statement').data;

// // Loops

stub = codeStubs['loops/for_loop'] = {};
stub.input  = stringify( require('./codeSnippets/loops/for_loop').input );
stub.output = stringify( require('./codeSnippets/loops/for_loop').output );
stub.data = require('./codeSnippets/loops/for_loop').data;

stub = codeStubs['loops/while_loop'] = {};
stub.input  = stringify( require('./codeSnippets/loops/while_loop').input );
stub.output = stringify( require('./codeSnippets/loops/while_loop').output );
stub.data = require('./codeSnippets/loops/while_loop').data;

stub = codeStubs['loops/do_while_loop'] = {};
stub.input  = stringify( require('./codeSnippets/loops/do_while_loop').input );
stub.output = stringify( require('./codeSnippets/loops/do_while_loop').output );
stub.data = require('./codeSnippets/loops/do_while_loop').data;

stub = codeStubs['loops/nested_loops'] = {};
stub.input  = stringify( require('./codeSnippets/loops/nested_loops').input );
stub.output = stringify( require('./codeSnippets/loops/nested_loops').output );
stub.data = require('./codeSnippets/loops/nested_loops').data;




// Functions

stub = codeStubs['functions/function_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_declaration').input );
stub.output = stringify( require('./codeSnippets/functions/function_declaration').output );
stub.data = require('./codeSnippets/functions/function_declaration').data;

stub = codeStubs['functions/function_invocation'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_invocation').input );
stub.output = stringify( require('./codeSnippets/functions/function_invocation').output );
stub.data = require('./codeSnippets/functions/function_invocation').data;

stub = codeStubs['functions/function_invocation_assignment'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_invocation_assignment').input );
stub.output = stringify( require('./codeSnippets/functions/function_invocation_assignment').output );
stub.data = require('./codeSnippets/functions/function_invocation_assignment').data;

stub = codeStubs['functions/function_return_statement'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_return_statement').input );
stub.output = stringify( require('./codeSnippets/functions/function_return_statement').output );
stub.data = require('./codeSnippets/functions/function_return_statement').data;

stub = codeStubs['functions/function_with_argument'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_argument').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_argument').output );
stub.data = require('./codeSnippets/functions/function_with_argument').data;

stub = codeStubs['functions/function_with_arguments'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_arguments').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_arguments').output );
stub.data = require('./codeSnippets/functions/function_with_arguments').data;

stub = codeStubs['functions/function_with_conditional_returns'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_conditional_returns').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_conditional_returns').output );
stub.data = require('./codeSnippets/functions/function_with_conditional_returns').data;

stub = codeStubs['functions/function_with_return_operation'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_return_operation').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_return_operation').output );
stub.data = require('./codeSnippets/functions/function_with_return_operation').data;

stub = codeStubs['functions/recursive_function'] = {};
stub.input  = stringify( require('./codeSnippets/functions/recursive_function').input );
stub.output = stringify( require('./codeSnippets/functions/recursive_function').output );
stub.data = require('./codeSnippets/functions/recursive_function').data;

// Objects
stub = codeStubs['objects/object_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_declaration').input );
stub.output = stringify( require('./codeSnippets/objects/object_declaration').output );
stub.data = require('./codeSnippets/objects/object_declaration').data;

stub = codeStubs['objects/object_properties'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_properties').input );
stub.output = stringify( require('./codeSnippets/objects/object_properties').output );
stub.data = require('./codeSnippets/objects/object_properties').data;

stub = codeStubs['objects/object_methods'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_methods').input );
stub.output = stringify( require('./codeSnippets/objects/object_methods').output );
stub.data = require('./codeSnippets/objects/object_methods').data;

stub = codeStubs['objects/object_method_invocation'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_method_invocation').input );
stub.output = stringify( require('./codeSnippets/objects/object_method_invocation').output );
stub.data = require('./codeSnippets/objects/object_method_invocation').data;

stub = codeStubs['objects/object_property_object'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_property_object').input );
stub.output = stringify( require('./codeSnippets/objects/object_property_object').output );
stub.data = require('./codeSnippets/objects/object_property_object').data;

stub = codeStubs['objects/object_property_object_method'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_property_object_method').input );
stub.output = stringify( require('./codeSnippets/objects/object_property_object_method').output );
stub.data = require('./codeSnippets/objects/object_property_object_method').data;

stub = codeStubs['objects/set_object_property'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_object_property').input );
stub.output = stringify( require('./codeSnippets/objects/set_object_property').output );
stub.data = require('./codeSnippets/objects/set_object_property').data;

stub = codeStubs['objects/set_object_method'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_object_method').input );
stub.output = stringify( require('./codeSnippets/objects/set_object_method').output );
stub.data = require('./codeSnippets/objects/set_object_method').data;

stub = codeStubs['objects/set_existing_object_property'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_existing_object_property').input );
stub.output = stringify( require('./codeSnippets/objects/set_existing_object_property').output );
stub.data = require('./codeSnippets/objects/set_existing_object_property').data;

stub = codeStubs['objects/set_nested_object_property'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_nested_object_property').input );
stub.output = stringify( require('./codeSnippets/objects/set_nested_object_property').output );
stub.data = require('./codeSnippets/objects/set_nested_object_property').data;

stub = codeStubs['objects/set_object_to_variable'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_object_to_variable').input );
stub.output = stringify( require('./codeSnippets/objects/set_object_to_variable').output );
stub.data = require('./codeSnippets/objects/set_object_to_variable').data;




module.exports = codeStubs;