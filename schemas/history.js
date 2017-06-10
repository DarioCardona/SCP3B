var mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');

var HistorySchema = new mongoose.Schema({

  class_code: String,
  year: Date, //0 = limpio con problemas  1 = no limpiada
  semester: String,
  period:String,
  score: Number,
  state:String

});

//ReportSchema.plugin(uniqueValidator);
module.exports = mongoose.model('History', HistorySchema);
