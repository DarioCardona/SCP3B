var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  Firstname : String,
  password : String,
  Secondname: String,
  account: Number,
  id: String,
  cel: String,
  direction: String,
  carrier: String,
  role: Number,

});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);
