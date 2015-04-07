var THREE = require('three');
var TWEEN = require('tween.js');

var Constants = {};

Constants.color = {};
Constants.color.grayness = 0.9;
Constants.color.materialGrayness = 0.5;
Constants.color.loopCycle = 0xffffff;
Constants.color.loopCycleGrayness = 1;
Constants.color.selection = 0xffff00;
Constants.color.timeline = 0xffffff;
Constants.color.skybox = 0x555555;
Constants.color.clearColor = 0x333333;

Constants.loop = {};
Constants.loop.cycleSteps = 60;
Constants.loop.ticWidth = 30;
Constants.loop.ticHeight = 10;

Constants.time = {};
Constants.time.loopCycle = 90000;
Constants.time.selectionRotation = 3000;
Constants.time.timelineFade = 1000;
Constants.time.cycle = 500;
Constants.time.tweenDuration = 600;
Constants.time.timelineDelay = Constants.time.tweenDuration * 2;
Constants.time.timelightDelay = Constants.time.tweenDuration * 2;
Constants.time.timelightSpeed = 5;

Constants.size = {};
Constants.size.step = 100;
Constants.size.buffer = 10;
Constants.size.scope = -500;
Constants.size.conditional = 100;
Constants.size.block = 500;
Constants.size.dot = 10;
Constants.size.topOffset = 105;
Constants.size.radius = 300;

Constants.camera = {};
Constants.camera.offsetX = 300;
Constants.camera.offsetY = 800;
Constants.camera.offsetZ = 800;



module.exports = Constants;