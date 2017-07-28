const express = require('express');

const Brewery = require('../models/brewery');
const Beer = require('../models/beer');
// const User = require('../models/user')

const router = express.Router({ mergeParams: true });



// INDEX
router.get('/', (request, response) => {

    const breweryIdToFind = request.params.brewery.id;

    Brewery.findById(breweryIdToFind)
        .then((brewery) => {
            response.render(
                'beer/index',
                {
                    brewery: brewery.name,
                    beers: brewery.beer
                }
            )
        })
});

// RENDER THE NEW FORM
// router.get('beer/new', (request, response) => {

//     const userId = request.params.userId;

//     response.render(
//         'items/new',
//         { userId }
//     );
// });

// router.post('/beer', (request, response) => {
//     const userId = request.params.userId;
//     const newItemInfo = request.body;

    

//     User.findById(userId)
//         .then((user) => {
//             const newItem = new Item(newItemInfo);  
//             console.log('yooooooooo' + newItem);
            
//             user.items.push(newItem);

//             user.save()
//                 .then((user) => {
//                     console.log("Saved new user with ID of " + user._id);

//                     response.render(
//                         'items/show',
//                         {
//                             userId,
//                             userName: user.first_name,
//                             itemId: newItem._id,
//                             itemName: newItem.name
//                         }
//                     )
//                 })
//                 .catch((error) => {
//                     console.log(error);
//                 })
//         })
//         .catch((error) => {
//             console.log(error);
//         })

// });

// // SHOW
// router.get('/:beerId', (request, response) => {
//     const breweryId = request.params.breweryId;
//     const beerId = request.params.beerId;

//     Brewery.findById(breweryId)
//         .then((brewery) => {

//             const foundBeer = brewery.beer.find((beer) => {
//                 return beer.id === beerId
//             });

//             response.render(
//                 'beer/show',
//                 {
//                     breweryId,
//                     breweryName: brewery.name,
//                     beerId: foundBeer._id,
//                     beerName: foundBeer.name
//                 }
//             )
//         })
//         .catch((error) => {
//             console.log("Failed to find brewery");
//         })
// });

// // RENDER THE EDIT FORM
// router.get('/:beerId/edit', (request, response) => {
//     const userId = request.params.userId;
//     const itemId = request.params.itemId;

//     User.findById(userId)
//         .then((user) => {
//             const foundItem = user.items.find((item) => {
//                 return item.id === itemId;
//             })

//             response.render('items/edit', {
//                 userId,
//                 item: foundItem
//             });
//         })
// });

// // UPDATE AN ITEM
// router.put('/:beerId', (request, response) => {
//     const userId = request.params.userId;
//     const itemId = request.params.itemId;

//     User.findById(userId)
//         .then((user) => {
//             const foundItem = user.items.find((item) => {
//                 return item.id === itemId;
//             })

//             foundItem.name = request.body.name;

//             user.save()
//                 .then((user) => {
//                     console.log("updated user with ID of " + user._id)

//                     response.render(
//                         'items/index',
//                         {
//                             userId: user._id,
//                             userName: user.first_name,
//                             items: user.items
//                         }
//                     )
//                 })
//         })

// });

// // DELETE 
// router.get('/:beerId/delete', (request, response) => {
//     const userId = request.params.userId;
//     const itemId = request.params.itemId;

//     User.findById(userId)
//         .then((user) => {

//             const itemToDelete = user.items.find((item) => {
//                 return item.id === itemId;
//             })

//             const indexToDelete = user.items.indexOf(itemToDelete);

//             user.items.splice(indexToDelete, 1);

//             user.save().then((user) => {
//                 console.log("Successfully deleted item with ID of " + itemId + " from user");

//                 response.render(
//                     'items/index',
//                     {
//                         userId: user._id,
//                         userName: user.first_name,
//                         items: user.items
//                     }
//                 )
//             })
//         })
// });




module.exports = router;