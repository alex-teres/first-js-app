var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;
var User = require('../model/user');

module.exports = function(app) {
    var Schema = new mongoose.Schema({
        text:{
            type: String,
            required: true
        },
        owner:{
            type:ObjectID,
            ref: 'user'
        }
    });

    Schema.pre('save', function(next) {
        console.log(app.user);
        this.owner = app.user.id;
        User.update({_id: app.user._id},{$pushAll: {article:[this._id]}}, function(err){
            if(err){
                console.log(err);
            }else{
                console.log("Successfully added message owner");
            }
        });
        next();
    });
    return mongoose.model('message', Schema);
};