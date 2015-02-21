module.exports = {
input: function() {
var object = {};
object.f = function () {
  return 1;
}
},
output: function() {
var object = {};
___Program.object('object', object);
object.f = function () {
    ___Program.invoke('object.f');
    ___Program.returnState = 1;
    ___Program.return('object.f');
    return ___Program.returnState;
    ___Program.return('object.f');
};
___Program.setObjectProperty('object.f', object.f);
},
data: {
 "programSteps": [
  {
   "id": 2,
   "pointer": 1
  },
  {
   "id": 3,
   "value": "___function code"
  }
 ],
 "components": [
  {
   "id": 0,
   "type": "block",
   "name": "global",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 1,
   "type": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 2,
   "type": "var",
   "name": "object",
   "block": 0,
   "scope": 0,
   "createdAt": 0
  },
  {
   "id": 3,
   "type": "method",
   "name": "f",
   "block": 0,
   "scope": 0,
   "createdAt": 1,
   "parent": 1
  }
 ],
 "scopes": {
  "0": {
   "object": 2,
   "object.f": 3
  }
 }
}
}