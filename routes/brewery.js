var express = require('express');
const router = express.Router({mergeParams: true});

var Brewery = require('../models/brewery');
var User = require('../models/user');
var Beer = require('../models/beer');


/* GET home page. INDEX */
router.get('/', function(request, response, next) {

  const beerId = request.params.beerId;
  const breweryId = request.params.breweryId;

  Brewery.find({})
    .then((brewery) => {
      var arrayOfBeers = brewery.beers;
      console.log(brewery);
        response.render(
        'brewery/index',
        {
          arrayOfBeers,
          breweryId,
          beerId,
          brewery: brewery,
          name: brewery.name,
          beers: brewery.beers,
          location: brewery.location,
          email: brewery.email,
          website: brewery.website
        },
    ).catch((error) => {
    console.log('Error retrieving brewery from database!');
    console.log(error);
  });
  });
});

//this is the create new form
router.get('/new', (request, response) => {
	response.render('brewery/new');
});

// create route

router.post('/', (request, response) => {

  const newBreweryInfoFromForm = request.body;

  Brewery.create(newBreweryInfoFromForm).then((brewery) => {
    response.render(
        'brewery/show',
        {brewery},
    );
  }).catch((error) => {
    console.log('Error saving new brewery to database!');
    console.log(error);
  });
});

// Brewery show route
router.get('/:breweryId', function(request, response, next) {

    var breweryToSearchFor = request.params.breweryId;

    Brewery.findById(breweryToSearchFor)
        .then((brewery) => {
            response.render(
                'brewery/show',
                { brewery }
            );
        })
        .catch((error) => {
            console.log(`Error retrieving brewery with ID of ${breweryToSearchFor}`)
        });
});

//UPDATE brewery
router.put('/:breweryId', (request, response) => {
  const breweryIdToUpdate = request.params.breweryId;
  const updatedBreweryInfo = request.body;

  Brewery.findByIdAndUpdate(
    breweryIdToUpdate,
    updatedBreweryInfo,
    {new: true}
  ).then((brewery) => {
    console.log(`brewery with ID ${brewery._id} has been updated`);
    response.render(
      'brewery/show',
      {brewery},
    );
  }).catch((error) => {
    console.log(`${brewery._id} failed to update`);
    console.log(error);
  });
});

//DELETE
router.get('/:breweryId/delete', (request, response) => {
  const breweryIdToDelete = request.params.breweryId;
  Brewery.findByIdAndRemove(breweryIdToDelete).then(() => {
    console.log(`You have been visited by the demon of delete, ${breweryIdToDelete} is gone`);
    response.redirect('/brewery');
  });
});

//RENDER EDIT FORM
router.get('/:breweryId/edit', (request, response) => {
  const breweryIdToFind = request.params.breweryId;
  Brewery.findById(breweryIdToFind).then((brewery) => {
    response.render(
      'brewery/edit',
      {brewery},
    );
  }).catch((error) => {
    console.log(`error updating ${breweryIdToFind}`);
  });
});




//EXPORT LEAVE ALONE
module.exports = router;
