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

    Beer.findById(beerId)
        .then((beer) => {

            response.render(
                'beer/show',
                {
                    breweryId,
                    beerId,
                    name: beer.name,
                    description: beer.description,
                    reviews: beer.reviews,
                    rating: beer.rating,
                    photo: beer.photo
                }
            )
        })
        .catch((error) => {
            console.log("Failed to find" + error);
        })
});


// UPDATE AN ITEM
router.put('/:beerId', (request, response) => {
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;

    console.log('hello');

    Brewery.findById(breweryId)
        .then((brewery) => {
            const foundBeer = brewery.beers.find((beer) => {
                return beer.id === beerId;
            })

            foundBeer.name = request.body.name;

            brewery.save()
                .then((brewery) => {
                    console.log("updated user with ID of " + brewery._id)

                    response.render(
                        'beer/index',
                        {
                            breweryId: brewery._id,
                            brewery: brewery,
                            breweryName: brewery.name,
                            beer: brewery.beers,
                            name: brewery.beers,

                        }
                    )
                })
        })

});

// DELETE 
// router.get('/:beerId/delete', (request, response) => {
//   const beerIdToDelete = request.params.beerId;
//   Beer.findByIdAndRemove(beerIdToDelete).then(() => {
//     console.log(`You have been visited by the demon of delete, ${beerIdToDelete} is gone`);
//     response.redirect('beer/index');
//   });
// });


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

            // const beerToDelete = brewery.beers.find((beer) => {
            //     return beer.id === beerId;
            // })
            // const indexToDelete = brewery.beers.indexOf(beerToDelete);

            // brewery.beers.splice(indexToDelete, 1);

            // brewery.save().then((brewery) => {
            //     console.log("Successfully deleted item with ID of " + itemId + " from user");

                // response.render(
                //     'beer/index',
                //     {
                //     breweryId,
                //     beerId,
                //     brewery: brewery,
                //     name: brewery.beers,
                //     description: brewery.beers,
                //     reviews: brewery.beers,
                //     rating: brewery.beers,
                //     photo: [],
                //     locations: brewery.beers
                //     }
                // )

});

// RENDER THE EDIT FORM
router.get('/:beerId/edit', (request, response) => {
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;

    Brewery.findById(breweryId)
        .then((brewery) => {
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


module.exports = router;