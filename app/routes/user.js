var express = require('express');
var router = express.Router();
var User = require('../model/user');
var passport = require('passport');
var multer = require('multer');



module.exports = function (app) {

    router.get('/me', passport.authenticate('jwt', {session: false}), function (req, res) {
        User.find({username: app.user.username}, function (err, User) {
            if (!User) {
                res.status(404).json({error: 'Not found'});
            }
            if (!err) {
                res.status(200).json(User);
            } else {
                res.status(500).json({error: 'Server error'});
            }
        }).select('-role');
    });

    
    return router;
};


/*    router.put('/:id/promote', passport.authenticate('jwt', {session: false}), function (req, res) {
 user.findById(req.params.id, function (err, user) {
 if (user === 'admin') {

 }
 });
 });

 router.put('/:id/changePassword', passport.authenticate('jwt', {session: false}), function (req, res) {

 });*/