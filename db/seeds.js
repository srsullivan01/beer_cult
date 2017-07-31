var mongoose = require ('mongoose');
mongoose.connect(process.env.MONGODB_URI);


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
	photo: "https://s-media-cache-ak0.pinimg.com/736x/39/5e/83/395e8312d399c0ad1607c4b76a55778d--funny-fitness-workout-fitness.jpg",
	beers: [doubleJeopardy],
	fridge: []
});

var ct = new User({
	username: "Clarence",
	bio: "I love web development!",
	photo: "http://i.imgur.com/EykXDof.jpg",
	beers: [hooligan],
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

var hooligan = new Beer({
	name: "hooligan",
	description: "hazy with golden orange hoppy, bittersweet. YUM!",
	reviews: [],
	rating: 5,
	photo: "https://scofflawbeer.com/wp-content/uploads/2016/10/our-beers-double-jeopardy-1.jpg",
	locations: "Atlanta, Chicago, LA"
});

var scoffLaw  = new Brewery({
	name: "scofflaw brewering company",
	beers: [doubleJeopardy, hooligan],
	location: "Atlanta",
	email: "info@scofflawbeer.com",
	website: "scofflawbeer.com"
});

dirtyMike.save(function(error){
	if (error) console.log(error);
	console.log('dirty mike created!');
});

ct.save(function(error){
	if (error) console.log(error);
	console.log('ct created!');
});

doubleJeopardy.save(function(error){
	if (error) console.log(error);
	console.log('double Jeopardy created!');
});

hooligan.save(function(error){
	if (error) console.log(error);
	console.log('hooligan created!');
});

scoffLaw.save(function(error){
	if (error) console.log(error);
	console.log('scofflaw created!');
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/beer_cult');

// Now that we're connected, let's save that connection to the database in a variable.
var db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function(err){
  console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function() {
  console.log("database has been connected!");
});

module.exports = db;

mongoose.connection.close();
