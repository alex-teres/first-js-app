var express = require('express');
var passport = require('passport');//ctrl+shift+m
var jwtstrategy = require('../auth/jwt.strategy');

function routerFact(model) {
	var router = express.Router();

	router.get('/', function (req, res) {
		model.find(function (err, items) {
			res.status(200).json({items: items});
		});
 });

  router.get('/:id',function (req, res) {
   model.findById(req.params.id,function (err,items) {
    if (!items) {
     res.status(404).json({error: 'Not found'});
   }
   if (!err) {
     res.send(items);
   } else {
     res.status(500).json({error: 'Server error'});
   }
 });
 });

  router.post('/', passport.authenticate('jwt', {session: false }), function (req, res) {

    var post = new model(req.body);

    post.save(userCreatedCb);

    function userCreatedCb (err, post) {
      if(err == 'ValidationError') {
        res.status(400).json({error:'Validation Error'});
      }
      if (err) {
        res.json({error:err});
        /*res.status(500).json({error: 'Server error'});*/
      }
      else {
        res.status(200).json({message: 'Created'});
      }
    }
  });

  router.put('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {
   model.findById(req.params.id, function (err, items) {
    if (!items) {
      res.status(404).json({error: 'items not found'});
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

  router.delete('/:id', passport.authenticate('jwt', { session: false }), function (req, res) {

    model.findById(req.params.id, function (err, items){

      if(model.role === 'admin' || model.owner == req.body.owner){
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