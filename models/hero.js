var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var HeroSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true,
    unique: true,
  }
});

module.exports = mongoose.model('Hero', HeroSchema);  