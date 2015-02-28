var React = require("react/addons");
var Parser = require("../../../public/js/compiler/Parser");
var generateCode = require('escodegen').generate;
// var TubeTracker = require("../../../app/component/tube-tracker.jsx");

var codeStubs = require("../../lib/stub/codeStubs");
// var stubPrediction = require("../../lib/stub/prediction");

describe("Parser", function() {

  it("should have code stubs", function() {
    var test = 'declarations/variable_declaration';
    var input  = codeStubs[test].input;
    var output = codeStubs[test].output;

    expect(input).toBe('var x = 1;');
    expect(output).toBe("var x = 1;___Program.set('x', x);");
  });

  describe("Variable Declarations", function() {

    it("should parse variable declarations", function() {
      var test = 'declarations/variable_declaration';
      var input  = codeStubs[test].input;
      var output = codeStubs[test].output;
      var parsed = Parser(input);
      var code = generateCode(parsed).replace('\n', '');

      expect(code).toBe(output);
    });

    it("should parse variable declarations to boolean", function() {
      var test = 'declarations/boolean_declaration';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should parse variable declarations to undefined", function() {
      var test = 'declarations/undefined_declaration';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle implicit variable declaration", function() {
      var test = 'declarations/implicit_declaration';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

  });

  describe("Simple Expressions", function() {

    it("should handle assignment", function() {
      var test = 'expressions/assignment';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle assignment with operators", function() {
      var test = 'expressions/assignment_with_operator';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle the post-increment operator", function() {
      var test = 'expressions/post-increment_operator';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle the pre-increment operator", function() {
      var test = 'expressions/pre-increment_operator';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle the shorthand expression assignment operator", function() {
      var test = 'expressions/shorthand_expression_assignment_operator';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

  });

  describe("Flow Control", function() {

    describe("Conditionals", function() {

      it("should handle simple if statements", function() {
        var test = 'conditionals/if_statement';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });

      it("should handle if / else statements", function() {
        var test = 'conditionals/if_else_statement';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });

      it("should handle if / else if / else statements", function() {
        var test = 'conditionals/if_else_if_else_statement';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });

      it("should handle nested if statements", function() {
        var test = 'conditionals/nested_if_statement';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });

    });

    describe("Loops", function() {
      it("should handle for loops", function() {
        var test = 'loops/for_loop';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });
      it("should handle while loops", function() {
        var test = 'loops/while_loop';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });
      it("should handle while loops", function() {
        var test = 'loops/do_while_loop';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });
      it("should handle nested loops", function() {
        var test = 'loops/nested_loops';
        var output = codeStubs[test].output;
        var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
        expect(code).toBe(output);
      });
    });

  });

  describe("Functions", function() {
    it("should handle function declarations", function() {
      var test = 'functions/function_declaration';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle functions with return statements", function() {
      var test = 'functions/function_return_statement';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle functions with a single argument", function() {
      var test = 'functions/function_with_argument';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle functions with multiple arguments", function() {
      var test = 'functions/function_with_arguments';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle functions with conditionally dependent return statements", function() {
      var test = 'functions/function_with_conditional_returns';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle functions with return operations", function() {
      var test = 'functions/function_with_return_operation';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle recursive functions", function() {
      var test = 'functions/recursive_function';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });
  });


  describe("Object", function() {
    it("should handle object declarations", function() {
      var test = 'objects/object_declaration';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle object properties", function() {
      var test = 'objects/object_properties';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle object methods", function() {
      var test = 'objects/object_methods';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle object properties that are objects", function() {
      var test = 'objects/object_property_object';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle nested objects with methods", function() {
      var test = 'objects/object_property_object_method';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should set object properties", function() {
      var test = 'objects/set_object_property';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should set object methods", function() {
      var test = 'objects/set_object_method';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should set existing object properties", function() {
      var test = 'objects/set_existing_object_property';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should set properties of nested objects", function() {
      var test = 'objects/set_nested_object_property';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should reset an object to a variable", function() {
      var test = 'objects/set_object_to_variable';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should create a pointer to an object outside of the current scope", function() {
      var test = 'objects/pointer_to_object_outside_scope';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should create a pointer to a new object assigned to a property", function() {
      var test = 'objects/object_property_new_object';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should create a pointer to an object assigned to a property", function() {
      var test = 'objects/pointer_to_object_as_property';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });
   
  });

  describe("Array", function() {
    it("should handle array declarations", function() {
      var test = 'arrays/array_declaration';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle arrays with objects", function() {
      var test = 'arrays/array_with_objects';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should handle nested arrays", function() {
      var test = 'arrays/nested_arrays';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should change a value at an indexed position", function() {
      var test = 'arrays/change_array_index';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });

    it("should nest an array inside of an object", function() {
      var test = 'arrays/object_with_array';
      var output = codeStubs[test].output;
      var code = generateCode( Parser( codeStubs[test].input ) ).replace('\n', '');
      expect(code).toBe(output);
    });
  });
});
