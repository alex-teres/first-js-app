var express = require('express');
var router = express.Router();
var User = require('../model/user');
var jwt = require('jsonwebtoken');
var conf = require('../../config.js') ;


/*router.post('/register', function(req,res) {
    var user = new User({username:req.body.username, password:req.body.password});
    user.save(function(err) {
      if(err){
        return err;
      }
      else{
        req.logIn(user, function(err) {
          if(err){
            return err;
          }
          else{
            res.redirect('/profile');
          }
        });
      }
    });
  });*/

  router.post('/login', function(req, res) {
    User.findOne({username:req.body.username,password:req.body.password},function (err, user) {
     if (err) throw err;
     if (user) {
       if (user.password !== req.body.password) {
        res.status(401).json({message: 'Wrong password'});
      } else {
        var token = jwt.sign({username: user.username}, conf.jwtSecretKey);
        res.json({token: token});
      }
    } else {
     res.json({message: 'User not found' });
   }
 });
  });

  module.exports = router;