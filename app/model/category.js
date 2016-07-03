var mongoose = require('mongoose');
var ObjectID = mongoose.Schema.Types.ObjectId;

module.exports = function() {

    var Schema = new mongoose.Schema({
        name:{
            type: String,
            required: true,
            unique: true
        },
        children: {
            type: [{ type: ObjectID, ref: 'Category'}]
        }
    });


    return mongoose.model('Category', Schema);
};








