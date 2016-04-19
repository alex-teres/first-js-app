var express = require('express');
var passport = require('passport');//ctrl+shift+m
var jwtstrategy = require('../auth/jwt.strategy');
var jwt = require('jsonwebtoken');


function routerFact(model) {
	var router = express.Router();

	router.get('/', function (req, res) {
		model.find(function (err, items) {
			res.status(200).json(items);
		}).select('-password');
 });

  router.get('/:id',passport.authenticate('jwt', {session: false }), function (req, res) {
   model.findById(req.params.id,function (err,items) {
    if (!items) {
     res.status(404).json({error: 'Not found'});
   }
   if (!err) {
     res.send(items);
   } else {
     res.status(500).json({error: 'Server error'});
   }
 }).select('-password');
 });

  router.post('/', function (req, res) {

if(model == article){
    req.body.owner = user._id;
    }
    var post = new model(req.body);


    post.save(function (err, post) {
      if (err) {
        /*res.status(500).json({error: 'Server error'});*/
      res.send(err);
      }
      else {
        res.status(200).json({message: 'Created'});
      }
    });
  });

  router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
   model.findById(req.params.id, function (err, items) {
    if (!items) {
      res.status(404).json({error: 'Not found'});
    }
    items.update(req.body,function (err) {
      if (err)
      {
        res.status(500).json({error: 'Server error'});
      }
      else {
        res.status(200).json({message: 'Updated'});
      }
    });
  });
 });

  router.delete('/:id',function (req, res) {
     model.findById(req.params.id, function (err, items){
     if(req.user.role == '2' || model.owner == req.user.username || model.username == req.user.username){
        if (!items) {
          res.status(404).json({error: 'Not found'});
        }
        else {
          items.remove(function (err) {
            if (!err) {
             res.status(200).json({message: 'Items removed'});
           } else {
             res.status(500).json({error: 'Server error'});
           }
         });
        }
     }
      else{
        res.status(401).json({error:'Access denied'});
      }
    });
  });

  return router;
}

module.exports = routerFact;