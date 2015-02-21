var codeStubs = {}, stub, obj;

var stringify = function (code) {
  var text = code.toString();
  text = text.substring(14, text.length - 2);
  return text.replace('\n', '');
}

// Variable Declarations

stub = codeStubs['declarations/variable_declaration'] = {};
snippet = require('./codeSnippets/declarations/variable_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['declarations/boolean_declaration'] = {};
snippet = require('./codeSnippets/declarations/boolean_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['declarations/undefined_declaration'] = {};
snippet = require('./codeSnippets/declarations/undefined_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['declarations/implicit_declaration'] = {};
snippet = require('./codeSnippets/declarations/implicit_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;


// // Simple expressions

stub = codeStubs['expressions/assignment'] = {};
snippet = require('./codeSnippets/expressions/assignment')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['expressions/assignment_with_operator'] = {};
snippet = require('./codeSnippets/expressions/assignment_with_operator')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['expressions/post-increment_operator'] = {};
snippet = require('./codeSnippets/expressions/post-increment_operator')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['expressions/pre-increment_operator'] = {};
snippet = require('./codeSnippets/expressions/pre-increment_operator')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['expressions/shorthand_expression_assignment_operator'] = {};
snippet = require('./codeSnippets/expressions/shorthand_expression_assignment_operator')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;


// // Flow Control

// // Conditionals

stub = codeStubs['conditionals/if_statement'] = {};
snippet = require('./codeSnippets/conditionals/if_statement')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['conditionals/if_else_statement'] = {};
snippet = require('./codeSnippets/conditionals/if_else_statement')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['conditionals/if_else_if_else_statement'] = {};
snippet = require('./codeSnippets/conditionals/if_else_if_else_statement')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['conditionals/nested_if_statement'] = {};
snippet = require('./codeSnippets/conditionals/nested_if_statement')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

// // Loops

stub = codeStubs['loops/for_loop'] = {};
snippet = require('./codeSnippets/loops/for_loop')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['loops/while_loop'] = {};
snippet = require('./codeSnippets/loops/while_loop')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['loops/do_while_loop'] = {};
snippet = require('./codeSnippets/loops/do_while_loop')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['loops/nested_loops'] = {};
snippet = require('./codeSnippets/loops/nested_loops')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;




// Functions

stub = codeStubs['functions/function_declaration'] = {};
snippet = require('./codeSnippets/functions/function_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_invocation'] = {};
snippet = require('./codeSnippets/functions/function_invocation')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_invocation_assignment'] = {};
snippet = require('./codeSnippets/functions/function_invocation_assignment')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_return_statement'] = {};
snippet = require('./codeSnippets/functions/function_return_statement')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_with_argument'] = {};
snippet = require('./codeSnippets/functions/function_with_argument')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_with_arguments'] = {};
snippet = require('./codeSnippets/functions/function_with_arguments')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_with_conditional_returns'] = {};
snippet = require('./codeSnippets/functions/function_with_conditional_returns')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/function_with_return_operation'] = {};
snippet = require('./codeSnippets/functions/function_with_return_operation')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['functions/recursive_function'] = {};
snippet = require('./codeSnippets/functions/recursive_function')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

// Objects
stub = codeStubs['objects/object_declaration'] = {};
snippet = require('./codeSnippets/objects/object_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_properties'] = {};
snippet = require('./codeSnippets/objects/object_properties')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_methods'] = {};
snippet = require('./codeSnippets/objects/object_methods')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_method_invocation'] = {};
snippet = require('./codeSnippets/objects/object_method_invocation')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_property_object'] = {};
snippet = require('./codeSnippets/objects/object_property_object')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_property_object_method'] = {};
snippet = require('./codeSnippets/objects/object_property_object_method')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/set_object_property'] = {};
snippet = require('./codeSnippets/objects/set_object_property')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/set_object_method'] = {};
snippet = require('./codeSnippets/objects/set_object_method')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/set_existing_object_property'] = {};
snippet = require('./codeSnippets/objects/set_existing_object_property')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/set_nested_object_property'] = {};
snippet = require('./codeSnippets/objects/set_nested_object_property')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/set_object_to_variable'] = {};
snippet = require('./codeSnippets/objects/set_object_to_variable')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/pointers_to_objects'] = {};
snippet = require('./codeSnippets/objects/pointers_to_objects')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/pointer_to_object_as_property'] = {};
snippet = require('./codeSnippets/objects/pointer_to_object_as_property')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/pointer_to_object_outside_scope'] = {};
snippet = require('./codeSnippets/objects/pointer_to_object_outside_scope')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_property_new_object'] = {};
snippet = require('./codeSnippets/objects/object_property_new_object')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['objects/object_property_pointer_to_object'] = {};
snippet = require('./codeSnippets/objects/object_property_pointer_to_object')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;


// Arrays
stub = codeStubs['arrays/array_declaration'] = {};
snippet = require('./codeSnippets/arrays/array_declaration')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['arrays/nested_arrays'] = {};
snippet = require('./codeSnippets/arrays/nested_arrays')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['arrays/array_with_objects'] = {};
snippet = require('./codeSnippets/arrays/array_with_objects')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;

stub = codeStubs['arrays/change_array_index'] = {};
snippet = require('./codeSnippets/arrays/change_array_index')
stub.input  = stringify( snippet.input );
stub.output = stringify( snippet.output );
stub.data = snippet.data;




module.exports = codeStubs;