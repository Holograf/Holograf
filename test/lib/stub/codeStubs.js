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

stub = codeStubs['declarations/boolean_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/boolean_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/boolean_declaration').output );

stub = codeStubs['declarations/undefined_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/undefined_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/undefined_declaration').output );

stub = codeStubs['declarations/implicit_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/declarations/implicit_declaration').input );
stub.output = stringify( require('./codeSnippets/declarations/implicit_declaration').output );


// // Simple expressions

stub = codeStubs['expressions/assignment'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/assignment').input );
stub.output = stringify( require('./codeSnippets/expressions/assignment').output );

stub = codeStubs['expressions/assignment_with_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/assignment_with_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/assignment_with_operator').output );

stub = codeStubs['expressions/post-increment_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/post-increment_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/post-increment_operator').output );

stub = codeStubs['expressions/pre-increment_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/pre-increment_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/pre-increment_operator').output );

stub = codeStubs['expressions/shorthand_expression_assignment_operator'] = {};
stub.input  = stringify( require('./codeSnippets/expressions/shorthand_expression_assignment_operator').input );
stub.output = stringify( require('./codeSnippets/expressions/shorthand_expression_assignment_operator').output );


// // Flow Control

// // Conditionals

stub = codeStubs['conditionals/if_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/if_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/if_statement').output );

stub = codeStubs['conditionals/if_else_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/if_else_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/if_else_statement').output );

stub = codeStubs['conditionals/if_else_if_else_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/if_else_if_else_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/if_else_if_else_statement').output );

stub = codeStubs['conditionals/nested_if_statement'] = {};
stub.input  = stringify( require('./codeSnippets/conditionals/nested_if_statement').input );
stub.output = stringify( require('./codeSnippets/conditionals/nested_if_statement').output );

// // Loops

stub = codeStubs['loops/for_loop'] = {};
stub.input  = stringify( require('./codeSnippets/loops/for_loop').input );
stub.output = stringify( require('./codeSnippets/loops/for_loop').output );

stub = codeStubs['loops/while_loop'] = {};
stub.input  = stringify( require('./codeSnippets/loops/while_loop').input );
stub.output = stringify( require('./codeSnippets/loops/while_loop').output );

stub = codeStubs['loops/do_while_loop'] = {};
stub.input  = stringify( require('./codeSnippets/loops/do_while_loop').input );
stub.output = stringify( require('./codeSnippets/loops/do_while_loop').output );

stub = codeStubs['loops/nested_loops'] = {};
stub.input  = stringify( require('./codeSnippets/loops/nested_loops').input );
stub.output = stringify( require('./codeSnippets/loops/nested_loops').output );




// Functions

stub = codeStubs['functions/function_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_declaration').input );
stub.output = stringify( require('./codeSnippets/functions/function_declaration').output );

stub = codeStubs['functions/function_return_statement'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_return_statement').input );
stub.output = stringify( require('./codeSnippets/functions/function_return_statement').output );

stub = codeStubs['functions/function_with_argument'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_argument').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_argument').output );

stub = codeStubs['functions/function_with_arguments'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_arguments').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_arguments').output );

stub = codeStubs['functions/function_with_conditional_returns'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_conditional_returns').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_conditional_returns').output );

stub = codeStubs['functions/function_with_return_operation'] = {};
stub.input  = stringify( require('./codeSnippets/functions/function_with_return_operation').input );
stub.output = stringify( require('./codeSnippets/functions/function_with_return_operation').output );

stub = codeStubs['functions/recursive_function'] = {};
stub.input  = stringify( require('./codeSnippets/functions/recursive_function').input );
stub.output = stringify( require('./codeSnippets/functions/recursive_function').output );

// Objects
stub = codeStubs['objects/object_declaration'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_declaration').input );
stub.output = stringify( require('./codeSnippets/objects/object_declaration').output );

stub = codeStubs['objects/object_properties'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_properties').input );
stub.output = stringify( require('./codeSnippets/objects/object_properties').output );

stub = codeStubs['objects/object_methods'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_methods').input );
stub.output = stringify( require('./codeSnippets/objects/object_methods').output );

stub = codeStubs['objects/object_property_object'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_property_object').input );
stub.output = stringify( require('./codeSnippets/objects/object_property_object').output );

stub = codeStubs['objects/object_property_object_method'] = {};
stub.input  = stringify( require('./codeSnippets/objects/object_property_object_method').input );
stub.output = stringify( require('./codeSnippets/objects/object_property_object_method').output );

stub = codeStubs['objects/set_object_property'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_object_property').input );
stub.output = stringify( require('./codeSnippets/objects/set_object_property').output );

stub = codeStubs['objects/set_object_method'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_object_method').input );
stub.output = stringify( require('./codeSnippets/objects/set_object_method').output );

stub = codeStubs['objects/set_existing_object_property'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_existing_object_property').input );
stub.output = stringify( require('./codeSnippets/objects/set_existing_object_property').output );

stub = codeStubs['objects/set_nested_object_property'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_nested_object_property').input );
stub.output = stringify( require('./codeSnippets/objects/set_nested_object_property').output );

stub = codeStubs['objects/set_object_to_variable'] = {};
stub.input  = stringify( require('./codeSnippets/objects/set_object_to_variable').input );
stub.output = stringify( require('./codeSnippets/objects/set_object_to_variable').output );




module.exports = codeStubs;