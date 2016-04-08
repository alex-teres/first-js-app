var express = require('express');
var router = express.Router();
var user = require('../model/user');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'greedisgood';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  user.findOne({id: jwt_payload.id}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
}));

router.post('/register',function(req,res) {
  function register (req, res, next) {
    var user = new User({username:req.body.username, password:req.body.password});
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
});

router.post('/login', function(req, res) {
  user.findOne({name: req.body.name}, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({message: 'User not found.' });
    } else if (user) {

      if (user.password != req.body.password) {
        res.json({message: 'Wrong password.' });
      } else {

        var token = jwt.sign(user, opts.secretOrKey);
        res.json(token);
      }   

    }

  });
});

module.exports = router;