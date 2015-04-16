// var Code = require('./codeModel.js');

module.exports = {
  findId: function(req, res, next, id){
    req.id = id;
    next();
  },

  addCode: function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    // new Code(req.body).save(function(err, code, numAffected){
    //   if (err) {
    //     return res.sendStatus(500);
    //   }
    //   return res.status(200).send({'code': code._id});
    // });
    return res.status(200)
  },

  getCode: function(req, res, next){
    res.header('Access-Control-Allow-Origin', "*");
    // var id = req.id;
    // Code.find({_id: id}, function(err, results){
    //   if (err) {
    //     res.sendStatus(500);
    //   }
    //   res.send(results);
    // });
    return res.status(200)
  }
};
