module.exports.dbQuery = function (queryJSON) {

  var dbQuery = {};

  console.log(queryJSON);

  if (queryJSON.start_location) {
    dbQuery.start_location = {
      $near : {
        $geometry : {
          type : "Point",
          coordinates : [queryJSON.start_location.coordinates[0] * 1,
                         queryJSON.start_location.coordinates[1] * 1 ]
        },
        $maxDistance : queryJSON.start_location.range * 1
      }
    }
  }


  if (queryJSON.end_location) {
    dbQuery.end_location = {
      $near : {
        $geometry : {
          type : "Point",
          coordinates : [queryJSON.end_location.coordinates[0] * 1,
                         queryJSON.end_location.coordinates[1] * 1 ]
        },
        $maxDistance : queryJSON.end_location.range * 1
      } 
    }
  }


  if (queryJSON.tags) {
    dbQuery['meta.tags'] = {
      $in : queryJSON.tags
    }
  }


  if (queryJSON.categories) {
    dbQuery['meta.categories'] = {
      $in : queryJSON.categories
    }
  }


  if (queryJSON.times) {
    dbQuery['meta.times'] = {
      $in : queryJSON.times
    }
  }


  if (queryJSON.title) {
    dbQuery['meta.title'] = queryJSON.title;
  }


  if (queryJSON.author) {
    dbQuery['meta.author'] = queryJSON.author;
  }


  if (queryJSON.distance) {
    dbQuery['distance.value'] = {}
    if (queryJSON.distance.max) {
      dbQuery['distance.value']['$lte'] = queryJSON.distance.max * 1;
    }
    if (queryJSON.distance.min) {
      dbQuery['distance.value']['$gte'] = queryJSON.distance.min * 1;
    }
  }


  if (queryJSON.duration) {
    dbQuery['duration.value'] = {}
    if (queryJSON.duration.max) {
      dbQuery['duration.value']['$lte'] = queryJSON.duration.max * 1;
    }
    if (queryJSON.duration.min) {
      dbQuery['duration.value']['$gte'] = queryJSON.duration.min * 1;
    }
  }


  if (queryJSON.sortBy) {
    var order = 1;
    var sortString = queryJSON.sortBy;
    if (sortString[0] === '-') {
      order *= -1;
      sortString = sortString.substring(1, sortString.length);
    }
    dbQuery['meta.' + sortString] = order;
  }


  if (queryJSON.stops) {

    if (queryJSON.stops.name) {
      dbQuery['stops.name'] = queryJSON.stops.name;
    }

    if (queryJSON.stops.tags) {
      dbQuery['stops.tags'] = {
        $in : queryJSON.stops.tags
      }
    }

    if (queryJSON.stops.location) {
      dbQuery['stops.location'] = {
        $near : {
          $geometry : {
            type : "Point",
            coordinates : [queryJSON.stops.location.coordinates[0] * 1,
                           queryJSON.stops.location.coordinates[1] * 1 ]
          },
          $maxDistance : queryJSON.stops.location.range * 1
        }
      }
    }
  }


  console.log("DB QUERY", dbQuery);

  return dbQuery;
}