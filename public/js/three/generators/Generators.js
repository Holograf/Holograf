var Generators = {};

Generators.array = require('./components/Array');
Generators.object = require('./components/Object');
Generators.functionDeclaration = require('./components/FunctionDeclaration');
Generators.functionInvocation = require('./components/FunctionInvocation');
Generators.functionReturn = require('./components/FunctionReturn');
Generators.loop = require('./components/Loop');
Generators.loopCycle = require('./components/LoopCycle');
Generators.value = require('./components/Value');
Generators.label = require('./components/Label');
Generators.property = require('./components/Property');
Generators.element = require('./components/Element');
Generators.conditional = require('./components/Conditional');

Generators.selection = require('./scene/Selection');
Generators.visualTimeline = require('./scene/VisualTimeline');
Generators.timelight = require('./scene/Timelight');
Generators.dotGrid = require('./scene/DotGrid');
Generators.skybox = require('./scene/Skybox');

module.exports = Generators;