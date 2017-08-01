const express = require('express');

const Brewery = require('../models/brewery');
const Beer = require('../models/beer');
const User = require('../models/user')

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
  const breweryId = request.params.breweryId;
  const newBeerInfo = request.body;

  Brewery.findById(breweryId).then((brewery) => {
      const newBeer = new Beer(newBeerInfo);
      brewery.beers.push(newBeer);
      return brewery.save();
  }).then((brewery) => {
      response.redirect('beer/')
  })
});

// SHOW
router.get('/:beerId', (request, response) => {
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;

    Brewery.findById(breweryId)
        .then((brewery) => {
            const foundBeer = brewery.beers.find((beer) => {
                return beer.id === beerId;
            })

            response.render(
                'beer/show',
                {
                    breweryId,
                    beer: foundBeer
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
    const breweryId = request.params.breweryId;
    const beerId = request.params.beerId;
    const updatedBeerInfo = request.body;
    const foundBeerArray =[];
    Brewery.findById(breweryId)
         
        .then((brewery) => {            
            const foundBeer = brewery.beers.find((beer) => {
                return beer.id === beerId;
           
            })

            foundBeer.name = request.body.name;
            foundBeer.description = request.body.description;
            foundBeer.reviews = request.body.reviews;
            foundBeer.rating = request.body.rating;
            foundBeerArray.push(foundBeer);
            

            return brewery.save();

                }).then((brewery) => {
                    console.log("updated user with ID of " + brewery._id)

                    response.render(
                        'beer/show',
                        {
                            breweryId,
                            brewery,
                            beer: foundBeerArray[0]
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