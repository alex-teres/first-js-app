var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var User = require('./user');

module.exports = function(app) {

  var Schema = new mongoose.Schema({
    text: {
      type: String,
      required: true
    },
    color:{
      type:String,
      default:'#ececec'
    },
    date:{
        type: Date
    },
    tag: {
      type: Array
    },
    title:{
      type: String,
      required:true
    },
    category:{
      type: ObjectId,
      ref: 'Category'
    },
    owner:{
      type:ObjectId,
      ref: 'user'
    }
  });
  Schema.pre('save', function(next) {
    this.date = new Date();
    this.owner = app.user.id;
    User.update({_id: app.user._id},{$pushAll: {article:[this._id]}}, function(err){
      if(err){
        console.log(err);
      }else{
        console.log("Successfully added article");
      }
    });
    next();
  });

  return mongoose.model('article', Schema);
};








