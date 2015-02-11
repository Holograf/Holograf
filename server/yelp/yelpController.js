var Q = require('q');
var url = require('url');
var yelp = require('yelp').createClient({
  consumer_key: process.env.YELP_CONSUMER_KEY, 
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

module.exports = {

  fetchYelp: function (req, res, next) {

    //Only call the Yelp API if the keys are defined
    if (process.env.YELP_CONSUMER_KEY) {

      var latLng = req.body.latitude+','+req.body.longitude;

      yelp.search({
        ll: latLng,
        radius_filter: '152.4',
        limit: '5'
      },function(error, data){
        if(error){
          next(error);
        }else{
          var businesses = data.businesses;
          var outputObj = {};
          businesses.map(function(item, index, collection){
            outputObj[item.name] = item;
          });
          res.send(outputObj);
        }
      });
    } else {
      res.send({});
    }

  } 
};
