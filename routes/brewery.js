var express = require('express');
var router = express.Router();

var Brewery = require('../models/brewery');
var User = require('../models/user');
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
          beers: brewery.beers,
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
    console.log('Error saving new user to database!');
    console.log(error);
  });
});

// Brewery show route
router.get('/:id', function(request, response, next) {

    var breweryToSearchFor = request.params.id;

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
router.put('/:id', (request, response) => {
  const breweryIdToUpdate = request.params.id;
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
router.get('/:id/delete', (request, response) => {
  const breweryIdToDelete = request.params.id;
  Brewery.findByIdAndRemove(breweryIdToDelete).then(() => {
    console.log(`You have been visited by the demon of delete, ${breweryIdToDelete} is gone`);
    response.redirect('/brewery');
  });
});

//RENDER EDIT FORM
router.get('/:id/edit', (request, response) => {
  const breweryIdToFind = request.params.id;
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
