var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.ObjectId;

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
	password: {
		type: String,
		required: true
	},
	role:{
		type:Number,
		default: 1,
		ref:'userGroups'
	},
	article:[{ type:ObjectId , ref:'article' }]
});

var model = mongoose.model('user', Schema);
model.protectedFields = ['type', 'password'];

module.exports = model;