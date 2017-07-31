var express = require('express');
const router = express.Router({mergeParams: true});

var Brewery = require("../models/brewery");
var User = require("../models/user");
var Beer = require("../models/beer");

/* GET home page. INDEX */
router.get('/', function(request, response, next) {

  const userId = request.params.userId;

  User.find({}).then((user) => {
    response.render(
        'user/index',
        {
          user: user,
          username: this.username,
          //password: this.password,
        },
    ) .catch((error) => {
    console.log('Error retrieving user from database!');
    console.log(error);
    });
  });
});

//login route

router.put('/login', (request, response) => {
  console.log('I tried to login');
  const userInfo = request.body.username;

  User.findOne({"username": userInfo})
    .then((user) => {
      console.log(user)
      var findUsername = user.username;
        response.render(
          'user/show',
          {
            user
          }
        )
    })
});

//this is the create new form
router.get('/new', (request, response) => {
	response.render('user/new');
});

// User create route

router.post('/', (request, response) => {

  const newUserInfoFromForm = request.body;

  User.create(newUserInfoFromForm).then((user) => {
    response.render(
        'user/show',
        {user},
    );
  }).catch((error) => {
    console.log('Error saving new user to database!');
    console.log(error);
  });
});

// user show route
router.get('/:userId', function(request, response, next) {

    var userToSearchFor = request.params.userId;

    console.log(userToSearchFor);

    User.findById(userToSearchFor)
        .then((user) => {
            response.render(
                'user/show',
                { user
                  // bio: user.bio,
                  // photo: this.photo,
                  // beers: this.beers,
                  // fridge: this.fridge 
                }
            );
        })
        .catch((error) => {
            console.log(`Error retrieving user with ID of ${userToSearchFor}`)
        });
});

//UPDATE user
router.put('/:userId', (request, response) => {
  const userIdToUpdate = request.params.userId;
  const updatedUserInfo = request.body;

  User.findByIdAndUpdate(
    userIdToUpdate,
    updatedUserInfo,
    {new: true}
  ).then((user) => {
    console.log(`usercwith ID ${user._id} has been updated`);
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
router.get('/:userId/delete', (request, response) => {
  const userIdToDelete = request.params.userId;
  User.findByIdAndRemove(userIdToDelete).then(() => {
    console.log(`You have been visited by the demon of delete, ${userIdToDelete} is gone`);
    response.redirect('/user');
  });
});

//RENDER EDIT FORM
router.get('/:userId/edit', (request, response) => {
  const userIdToFind = request.params.userId;
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
