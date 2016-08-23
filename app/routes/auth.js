var express = require('express');
var router = express.Router();
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var conf = require('../../config.js');

router.post('/login', function (req, res) {
    User.findOne({username: req.body.username}, function (err, user) {
        if (err) throw err;
        if (user) {
            if (user.password !== req.body.password) {
                res.status(401).json({message: 'Wrong password'});
            } else {
                var token = jwt.sign({_id: user._id}, conf.jwtSecretKey);
                res.json({token: 'JWT ' + token});
            }
        }
        else {
            res.status(404).json({message: 'User not found'});
        }
    });
});
module.exports = router;