var express = require('express');
var router = express.Router();

var Brewery = require('../models/brewery');

//index
router.get('/', (request, response) => {
    Brewery.find({})
        .then((brewery) => {
            response.render(
                'brewery/index',
                { brewery }
            );
        })
        .catch((error) => {
            console.log('Error retrieving brewerys from database!');
            console.log(error);
        });
})


//this is the create new form 
router.get('/new', (request, response) => {
	response.render('brewery/new');
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

module.exports = router;
