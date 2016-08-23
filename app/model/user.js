var mongoose = require('mongoose');
const fs = require('fs');
var ObjectId = mongoose.Schema.ObjectId;

var Schema = new mongoose.Schema({
	name:{
		type:String
	},
	surName:{
		type:String
	},
	address:{
		type: String
	},
	avatarUrl: {
		type: String
	},
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
	}
	// role:{
	// 	type:ObjectId,
	// 	default:"5751687a63d9c83e1e1b8c4a",
	// 	ref:'userGroups'
	// }
});

Schema.post('save',function (doc) {
	fs.mkdir('uploads/'+doc._id, function (err) {
		if(err){console.log(err);}
		else {
			console.log("Directory was created")
		}
	});
});

Schema.post('remove',function (doc) {
	fs.rmdir('uploads/'+doc._id, function (err) {
		if(err){console.log(err);}
		else {
			console.log("Directory was deleted")
		}
	});
});

var model = mongoose.model('user', Schema);
model.protectedFields = ['type', 'password'];

module.exports = model;