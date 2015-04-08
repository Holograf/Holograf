var Generators = {};

Generators.array = require('./Array');
Generators.object = require('./Object');
Generators.functionDeclaration = require('./FunctionDeclaration');
Generators.functionInvocation = require('./FunctionInvocation');
Generators.functionReturn = require('./FunctionReturn');
Generators.loop = require('./Loop');
Generators.loopCycle = require('./LoopCycle');
Generators.value = require('./Value');
Generators.label = require('./Label');
Generators.property = require('./Property');
Generators.arrayElement = require('./ArrayElement');
Generators.conditional = require('./Conditional');

module.exports = Generators;