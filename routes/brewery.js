var express = require('express');
var router = express.Router();

var Brewery = require('../models/brewery');
var Beer = require('../models/beer');


/* GET home page. */
router.get('/', function(request, response, next) {

  Brewery.find({}).then((brewery) => {
    console.log(brewery.beer);
    response.render(
        'brewery/index',
        {
          brewery: brewery,
          name: brewery.name,
          beers: brewery.Beer.name,
          location: brewery.location,
          email: brewery.email,
          website: brewery.website
        },
    ) .catch((error) => {
    console.log('Error retrieving brewery from database!');
    console.log(error);
  });
  });
});

module.exports = router;
