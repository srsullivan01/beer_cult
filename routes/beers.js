const express = require('express');

const Brewery = require('../models/brewery');
const Beer = require('../models/beer');
// const User = require('../models/user')

const router = express.Router({ mergeParams: true });



// INDEX
router.get('/', (request, response) => {
    const breweryId = request.params.breweryId;

    Brewery.findById(breweryId)
        .then((brewery) => {
            var arrayOfBeers = brewery.beers;
            console.log("Array of Beers: " + arrayOfBeers);
            console.log("Brewery Id: " + breweryId);
            response.render(
                'beer/index',
                {
                    arrayOfBeers,
                    brewery: brewery,
                    breweryId,
                    name: brewery.beers,
                    description: brewery.beers,
                    reviews: brewery.beers,
                    rating: brewery.beers,
                    photo: [],
                    locations: brewery.beers                
                }
            )
        })
});

// RENDER THE NEW FORM
router.get('/new', (request, response) => {

    const breweryId = request.params.breweryId;

    response.render(
        'beer/new',
        { breweryId }
    );
});

// CREATE ROUTE
router.post('/', (request, response) => {
    const newBeerInfoFromForm = request.body;
    const breweryId = request.params.breweryId;

  Beer.create(newBeerInfoFromForm).then((beer) => {
    response.render(
        'beer/show',
        {
                breweryId,
                name: beer.name,
                description: beer.description,
                reviews: beer.reviews,
                rating: beer.rating,
                photo: beer.photo
        },
    );
  }).catch((error) => {
    console.log('Error saving new user to database!');
    console.log(error);
  });
});

// SHOW
router.get('/:beerId', (request, response) => {
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;

    Brewery.findById(breweryId)
        .then((brewery) => {
            var arrayOfBeers = brewery.beers;

            response.render(
                'beer/show',
                {
                    arrayOfBeers,
                    breweryId,
                    beerId,
                    name: brewery.beers.name,
                    description: brewery.beers.description,
                    reviews: brewery.beers.reviews,
                    rating: brewery.beers.rating,
                    photo: brewery.beers.photo
                }
            )
        })
        .catch((error) => {
            console.log("Failed to find" + error);
        })
});

// RENDER THE EDIT FORM
router.get('/:beerId/edit', (request, response) => {
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;

    Brewery.findById(breweryId)
        .then((brewery) => {
            arrayOfBeers = brewery.beers;

            const foundBeer = brewery.beers.find((beer) => {
                return beer.id === beerId;
            })

            response.render('beer/edit', {
                breweryId,
                beerId,
                beer: foundBeer
            });
        })
});

// UPDATE AN ITEM
router.put('/:beerId', (request, response) => {
    console.log("You hit the update route");
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;
    console.log(request.body.name);

    Brewery.findById(breweryId)
        .then((brewery) => {
            
            const foundBeer = brewery.beers.find((beer) => {
                return beer.id === beerId;
            })
            arrayOfBeers = brewery.beers;
            
            foundBeer.name = request.body.name;
            return brewery.save();

                }).then((brewery) => {
                    console.log("updated user with ID of " + brewery._id)

                    response.render(
                        'beer/index',
                        {
                            breweryId,
                            brewery,
                            breweryName: brewery.name,
                            beer: brewery.beers,
                            name: brewery.beers,
                            arrayOfBeers

                        }
                    )
                })

});

// DELETE 

router.get('/:beerId/delete', (request, response) => {
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;

    Brewery.findById(breweryId)
        .then((brewery) => {
            arrayOfBeers = brewery.beers;

            brewery.beers.id(beerId).remove();

            return brewery.save();

        }).then((brewery) => {
            response.render(
                'beer/index',
        {
                    breweryId,
                    beerId,
                    brewery: brewery,
                    name: brewery.beers,
                    description: brewery.beers,
                    reviews: brewery.beers,
                    rating: brewery.beers,
                    photo: [],
                    locations: brewery.beers,
                    arrayOfBeers
        }
            )
        })

});




module.exports = router;