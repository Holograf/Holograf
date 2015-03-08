var React = require('react/addons');
var Parser = require('../../../public/js/compiler/Parser');
var generateCode = require('escodegen').generate;
var execute = require('../../../public/js/compiler/WrappedCodeRunner');

var codeStubs = require("../../lib/stub/codeStubs");

var testFunction = function (test) {
  var output = codeStubs[test].output;
  var stubSteps = JSON.stringify( codeStubs[test].data.programSteps );
  var stubComponents = JSON.stringify( codeStubs[test].data.components );

  var data = execute(output);
  var programSteps = JSON.stringify( data.programSteps );
  var components = JSON.stringify( data.components );
  expect( programSteps ).toBe( stubSteps );
  expect( components ).toBe( stubComponents );  
}


describe("Program Compiler", function() {

  it("should have test data", function() {
    var test = 'declarations/variable_declaration';
    var data  = codeStubs[test].data;

    expect(data.programSteps).toBeDefined()
    expect(data.components).toBeDefined()
    expect(data.scopes).toBeDefined()
  });

  it("should have a global component", function() {
    var test = 'declarations/variable_declaration';
    var data  = codeStubs[test].data;

    var global = data.components[0];

    expect(global.id).toBe(0);
    expect(global.type).toBe('block');
    expect(global.name).toBe('global');
  });


  describe("Variable Declarations", function() {

    it("should parse variable declarations", function() {
      var test = 'declarations/variable_declaration';
      testFunction(test);
    });

    it("should parse variable declarations to boolean", function() {
      var test = 'declarations/boolean_declaration';
      testFunction(test);
    });

    it("should parse variable declarations to undefined", function() {
      var test = 'declarations/undefined_declaration';
      testFunction(test);
    });

    it("should handle implicit variable declaration", function() {
      var test = 'declarations/implicit_declaration';
      testFunction(test);
    });

  });

  describe("Simple Expressions", function() {

    it("should handle assignment", function() {
      var test = 'expressions/assignment';
      testFunction(test); 
    });

    it("should handle assignment with operators", function() {
      var test = 'expressions/assignment_with_operator';
      testFunction(test);
    });

    it("should handle the post-increment operator", function() {
      var test = 'expressions/post-increment_operator';
      testFunction(test);
    });

    it("should handle the pre-increment operator", function() {
      var test = 'expressions/pre-increment_operator';
      testFunction(test);
    });

    it("should handle the shorthand expression assignment operator", function() {
      var test = 'expressions/shorthand_expression_assignment_operator';
      testFunction(test);
    });

  });

  describe("Flow Control", function() {

    describe("Conditionals", function() {

      it("should handle simple if statements", function() {
        var test = 'conditionals/if_statement';
        testFunction(test);
      });

      it("should handle if / else statements", function() {
        var test = 'conditionals/if_else_statement';
        testFunction(test);
      });

      it("should handle if / else if / else statements", function() {
        var test = 'conditionals/if_else_if_else_statement';
        testFunction(test);
      });

      it("should handle nested if statements", function() {
        var test = 'conditionals/nested_if_statement';
        testFunction(test);
      });

    });

    describe("Loops", function() {
      it("should handle for loops", function() {
        var test = 'loops/for_loop';
        testFunction(test);
      });
      it("should handle while loops", function() {
        var test = 'loops/while_loop';
        testFunction(test);
      });
      it("should handle while loops", function() {
        var test = 'loops/do_while_loop';
        testFunction(test);
      });
      it("should handle nested loops", function() {
        var test = 'loops/nested_loops';
        testFunction(test);
      });
    });

  });

  describe("Functions", function() {
    it("should handle function declarations", function() {
      var test = 'functions/function_declaration';
      testFunction(test);
    });

    it("should handle function invocation with a variable assignment", function() {
      var test = 'functions/function_invocation_assignment';
      testFunction(test);
    });

    it("should handle function invocation without assignment", function() {
      var test = 'functions/function_invocation';
      testFunction(test);
    });

    it("should handle functions with return statements", function() {
      var test = 'functions/function_return_statement';
      testFunction(test);
    });

    it("should handle functions with a single argument", function() {
      var test = 'functions/function_with_argument';
      testFunction(test);
    });

    it("should handle functions with multiple arguments", function() {
      var test = 'functions/function_with_arguments';
      testFunction(test);
    });

    it("should handle functions with conditionally dependent return statements", function() {
      var test = 'functions/function_with_conditional_returns';
      testFunction(test);
    });

    it("should handle functions with return operations", function() {
      var test = 'functions/function_with_return_operation';
      testFunction(test);
    });

    it("should handle recursive functions", function() {
      var test = 'functions/recursive_function';
      testFunction(test);
    });

    it("should pass anonymous functions", function() {
      var test = 'functions/pass_anonymous_functions';
      testFunction(test);
    });
  });


  describe("Object", function() {
    it("should handle object declarations", function() {
      var test = 'objects/object_declaration';
      testFunction(test);
    });

    it("should handle object properties", function() {
      var test = 'objects/object_properties';
      testFunction(test);
    });

    it("should handle object methods", function() {
      var test = 'objects/object_methods';
      testFunction(test);
    });

    it("should handle object properties that are objects", function() {
      var test = 'objects/object_property_object';
      testFunction(test);
    });

    it("should handle nested objects with methods", function() {
      var test = 'objects/object_property_object_method';
      testFunction(test);
    });

    it("should set object properties", function() {
      var test = 'objects/set_object_property';
      testFunction(test);
    });

    it("should set object methods", function() {
      var test = 'objects/set_object_method';
      testFunction(test);
    });

    it("should set existing object properties", function() {
      var test = 'objects/set_existing_object_property';
      testFunction(test);
    });

    it("should set properties of nested objects", function() {
      var test = 'objects/set_nested_object_property';
      testFunction(test);
    });

    it("should reset an object to a variable", function() {
      var test = 'objects/set_object_to_variable';
      testFunction(test);
    });

    it("should create pointers to objects", function() {
      var test = 'objects/pointers_to_objects';
      testFunction(test);
    });

    it("should have a pointer to an object as a property", function() {
      var test = 'objects/pointer_to_object_as_property';
      testFunction(test);
    });

    it("should assign a pointer to an object outside of the current scope", function() {
      var test = 'objects/pointer_to_object_outside_scope';
      testFunction(test);
    });

    it("should assign a pointer to a new object assigned to a property", function() {
      var test = 'objects/object_property_new_object';
      testFunction(test);
    });

    it("should assign a pointer to a defined object assigned to a property", function() {
      var test = 'objects/pointer_to_object_as_property';
      testFunction(test);
    });
  });

  describe("Array", function() {
    it("should handle array declarations", function() {
      var test = 'arrays/array_declaration';
      testFunction(test);
    });

    it("should handle arrays with objects", function() {
      var test = 'arrays/array_with_objects';
      testFunction(test);
    });

    it("should handle nested arrays", function() {
      var test = 'arrays/nested_arrays';
      testFunction(test);
    });

    it("should set values at existing array indices", function() {
      var test = 'arrays/change_array_index';
      testFunction(test);
    });

    it("should nest an array within an object", function() {
      var test = 'arrays/object_with_array';
      testFunction(test);
    });

    it("should handle array.push", function() {
      var test = 'arrays/array_push';
      testFunction(test);
    });

    it("should handle array.pop", function() {
      var test = 'arrays/array_pop';
      testFunction(test);
    });

    it("should handle array.shift", function() {
      var test = 'arrays/array_shift';
      testFunction(test);
    });

    it("should handle array.unshift", function() {
      var test = 'arrays/array_unshift';
      testFunction(test);
    });

    it("should handle array.slice", function() {
      var test = 'arrays/array_slice';
      testFunction(test);
    });

    it("should handle simple array.splice insertion", function() {
      var test = 'arrays/array_splice';
      testFunction(test);
    });

    it("should handle splice out values", function() {
      var test = 'arrays/array_splice_out';
      testFunction(test);
    });
  });
});
