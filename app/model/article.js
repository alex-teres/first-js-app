var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String,
    required: true
  },
  theme:{
  	type: String,
  	required:true
  }
});

module.exports = mongoose.model('article', Schema);

