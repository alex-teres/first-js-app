var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	id: {
		type: Number,
		required: true
	},
	title:{
		type: String,
		required: true
	}
});

module.exports = mongoose.model('userGroups', Schema);