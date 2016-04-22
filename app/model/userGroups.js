var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var Schema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true
	},
	title:{
		type: String,
		required: true
	}
});

module.exports = mongoose.model('userGroups', Schema);