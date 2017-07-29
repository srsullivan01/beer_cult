var express = require('express');
var router = express.Router();

var Brewery = require("../models/brewery");
var User = require("../models/user");
var Beer = require("../models/beer");

/* GET home page. INDEX */
router.get('/', function(request, response, next) {
  User.find({}).then((user) => {
    response.render(
        'user/index',
        {
          user: user,
          username: this.username,
          //password: this.password,
          created_at: this.Date,
          updated_at: this.Date,
          bio: this.bio,
          photo: this.photo,
          beers: this.beer,
          fridge: this.fridge
        },
    ) .catch((error) => {
    console.log('Error retrieving user from database!');
    console.log(error);
    });
  });
});

//UPDATE user
router.put('/:id', (request, response) => {
  const userIdToUpdate = request.params.id;
  const updatedUserInfo = request.body;

  User.findByIdAndUpdate(
    userIdToUpdate,
    updatedUserInfo,
    {new: true}
  ).then((user) => {
    console.log(`userwith ID ${user._id} has been updated`);
    response.render(
      'user/show',
      {user},
    );
  }).catch((error) => {
    console.log(`${user._id} failed to update`);
    console.log(error);
  });
});

//DELETE
router.get('/:id/delete', (request, response) => {
  const userIdToDelete = request.params.id;
  User.findByIdAndRemove(userIdToDelete).then(() => {
    console.log(`You have been visited by the demon of delete, ${userIdToDelete} is gone`);
    response.redirect('/user');
  });
});

//this is the create new form
router.get('/new', (request, response) => {
	response.render('user/new');
});

// user show route
router.get('/:id', function(request, response, next) {

    var userToSearchFor = request.params.id;

    User.findById(userToSearchFor)
        .then((user) => {
            response.render(
                'user/show',
                { user }
            );
        })
        .catch((error) => {
            console.log(`Error retrieving user with ID of ${userToSearchFor}`)
        });
});


//RENDER EDIT FORM
router.get('/:id/edit', (request, response) => {
  const userIdToFind = request.params.id;
  User.findById(userIdToFind).then((user) => {
    response.render(
      'user/edit',
      {user},
    );
  }).catch((error) => {
    console.log(`error updating ${userIdToFind}`);
  });
});




module.exports = router;
