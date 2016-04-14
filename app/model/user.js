var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
	email:{
		type:String,
		required:true
	},
	username: {
		type: String,
		unique: true,
		required: true
	},
	owner:{
		type: String,
		unique:true,
		required:true
	},
	password: {
		type: String,
		required: true,
		select:false
	},
	type:{
		type: String,
		default:'user',
		required: true,
		select:false
	}
});

var model = mongoose.model('user', Schema);
model.protectedFields = ['type', 'password'];

module.exports = model;
