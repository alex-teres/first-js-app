var express = require('express');
var router = express.Router();
var user = require('../model/user');


function register (req, res, next) {
  var user = new User({ username: req.body.email, password: req.body.password});
  user.save(function(err) {
    return err
    ? next(err)
    : req.logIn(user, function(err) {
      return err
      ? next(err)
      : res.redirect('/private');
    });
  });
};

module.exports = router;