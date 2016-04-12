var express = require('express');
var router = express.Router();
var user = require('../model/user');
var article = require('../model/article');
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');
var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = 'greedisgood';

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  user.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      done(null, user);
      res.send('done');
    } else {
      done(null, false);
    }
    if(user.type !== 'admin' && user !== req.body.user){
      res.status(403).json({error:'Forbidden'});
    }
  });
}));

router.post('/register',function(req,res) {
  function register (req, res, next) {
    var user = new User({username:req.body.username, password:req.body.password});
    user.save(function(err) {
      if(next(err)){
        return err;
      }
      else{
        req.logIn(user, function(err) {
          if(next(err)){
            return err;
          }
          else{
            res.redirect('/profile');
          }
        });
      }
    });
  }
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
        res.coockie({Authorization:'JWT '+ token});
      }

    }

  });
});

module.exports = router;