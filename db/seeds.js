var mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/beer_cult');

var Brewery = require('../models/brewery');
var User = require('../models/user');
var Beer = require('../models/beer');

mongoose.Promise = global.Promise;

Brewery.remove({}, function(error){
	console.log(error);
});

User.remove({}, function(error){
	console.log(error);
});

Beer.remove({}, function(error){
	console.log(error);
});

//save the data

var dirtyMike = new User({
	username: "dirtyMikester",
	bio: "dirty mike is the name!",
	photo: "http://i.imgur.com/EykXDof.jpg",
	beers: [{name: "double Jeopardy"}],
	fridge: []
});

var doubleJeopardy = new Beer({
	name: "double Jeopardy",
	description: "hazy with golden orange hoppy, bittersweet. YUM!",
	reviews: [],
	rating: 5,
	photo: "https://scofflawbeer.com/wp-content/uploads/2016/10/our-beers-double-jeopardy-1.jpg",
	locations: "Atlanta, Chicago, LA"
});

var scoffLaw  = new Brewery({
	name: "scofflaw brewering company",
	beers: [{name: "double Jeopardy"}],
	location: "Atlanta",
	email: "info@scofflawbeer.com",
	website: "scofflawbeer.com"
});

dirtyMike.save(function(error){
	if (error) console.log(error);
	console.log('dirty mike created!');
});

doubleJeopardy.save(function(error){
	if (error) console.log(error);
	console.log('double Jeopardy created!');
});

scoffLaw.save(function(error){
	if (error) console.log(error);
	console.log('scofflaw created!');
});

mongoose.connection.close();










