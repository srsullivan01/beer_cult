//require express
var express = require('express');
var router = express.Router();

//bring in all user info
var User = require("../models/user");

//main login page
router.get('/', (request, response) => {

    response.render('welcome');
});

//when clicking login button





module.exports = router;
