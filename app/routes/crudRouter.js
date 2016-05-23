var express = require('express');
var passport = require('passport');//ctrl+shift+m
var jwt = require('jsonwebtoken');


module.exports =  function (model) {
	var router = express.Router();

	router.get('/', function (req, res) {
		model.find(function (err, items) {
			res.status(200).json(items);
		}).select('-password -role');
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

  router.post('/',  function (req, res) {
    var post = new model(req.body);


    post.save(function (err) {
      if (err) {
       res.status(500).json({error: 'Server error'});
      }
      else {
        res.status(200).json({message: 'Created'});
      }
    }).select('-role');
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
    }).select('-password -role -username');
  });
 });

  router.delete('/:id',function (req, res) {
   model.findById(req.params.id, function (err, items){
    if(req.user.role == '2' || model.owner.equals(req.user._id) || model._id.equals(req.user._id)){
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
};

