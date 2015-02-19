module.exports = {
input: function() {
var object = {
  stuff: {
    name: 'andy',
    quest: 'to test'
  }
};
},
output: function() {
var object = {
    stuff: {
        name: 'andy',
        quest: 'to test'
    }
};
___Program.object('object', object);
}}