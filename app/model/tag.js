var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = function() {

    var Schema = new mongoose.Schema({
        text:{
            type: String,
            required: true,
            unique: true
        }
    });


    return mongoose.model('Tag', Schema);
};








