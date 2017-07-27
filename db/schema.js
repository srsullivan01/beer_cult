var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Use native promises
mongoose.Promise = global.Promise;



var BeerSchema = new Schema ({
  name: {type: String, required: true},
  description: String,
  reviews: [],
  rating: Number,
  photo: String,
  locations: String
});
var UserSchema = new Schema ({
  username: String,
  //password: String,
  created_at: Date,
  updated_at: Date,
  bio: String,
  photo: String,
  beers: [BeerSchema],
  fridge: []
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});


var BrewerySchema = new Schema ({
  name: {type: String, required: true},
  beers: [BeerSchema],
  location: String,
  email: String,
  website: String
});


var BeerModel = mongoose.model("Beer", BeerSchema);
var UserModel = mongoose.model("User", UserSchema);
var BreweryModel = mongoose.model("Brewery", BrewerySchema);

module.exports = {
  Beer: BeerModel,
  User: UserModel,
  Brewery: BreweryModel
};
