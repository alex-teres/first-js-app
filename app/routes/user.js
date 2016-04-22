var express = require('express');
var router = express.Router();
var user = require('../model/user');
var passport = require('passport');


router.put('/:id/promote', passport.authenticate('jwt', { session: false }),function(req,res) {
	user.findById(req.params.id, function (err, user) {
		if(user === 'admin')
		{

		}
	});
 });

router.put('/:id/changePassword', passport.authenticate('jwt', { session: false }),function(req,res) {

 });

module.exports = router;