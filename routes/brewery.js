var express = require('express');
var router = express.Router();

var Brewery = require('../models/brewery');
var Beer = require('../models/beer');


/* GET home page. INDEX */
router.get('/', function(request, response, next) {

  Brewery.find({}).then((brewery) => {
    console.log(brewery.beer);
    response.render(
        'brewery/index',
        {
          brewery: brewery,
          name: brewery.name,
          beers: brewery.Beer,
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
//UPDTE


//DELTE
router.get('/:id/delete', (request, response) => {
  const breweryIdToDelete = request.params.id;
  Brewery.findByIdAndRemove(breweryIdToDelete).then(() => {
    console.log(`You have been visited by the demon of delete, ${breweryIdToDelete} is gone`);
    response.redirect('/');
  });
});




//EXPORT LEAVE ALONE
module.exports = router;
