var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Schema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  tag: {
    type: String
  },
  title:{
  	type: String,
  	required:true
  },
  owner:{
    type:ObjectId,
    required:true,
    ref: 'user'
  }
});

module.exports = mongoose.model('article', Schema);