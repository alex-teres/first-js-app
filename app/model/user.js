var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	username: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	type:{
		type: String,
		default:'user',
		required: true
	}
});

module.exports = mongoose.model('user', Schema);
