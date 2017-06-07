var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var ClassSchema = new mongoose.Schema({
  class_code : Number,
  class_name: String,
  unity: Number,


});

ClassSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Class', ClassSchema);
