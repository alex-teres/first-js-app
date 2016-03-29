var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.get('/', function (req, res) {
  user.find(function (err, user) {
   if (!err) {
    res.send(user);
  } else {
    res.status(500).json({error: 'Server error'})
  }
});
});

router.get('/:id', function (req, res) {

  user.findById(req.params.id,function (err,user) {
    if (!user) {
      res.status(404).json({error: 'Not found'});
    }
    if (!err) {
      res.send(user);
    } else {
      res.status(500).json({error: 'Server error'});
    }
  });
});

router.post('/', function (req, res) {

  var post = new user({
    username: req.body.username,
    password: req.body.password
  });

  post.save(userCreatedCb);

  function userCreatedCb (err, post) {
    if(err == 'ValidationError') {
      res.status(400).json({error:'Validation Error'});
    }
    if (err) {
     res.status(500).json({error: 'Server error'});
   }
   else {
    res.send(post);
  }
}
});

router.delete('/:id', function (req, res) {
  user.findById(req.params.id, function (err, user){
    if (!user) {
      res.status(404).json({error: 'Not found'});
    }
    user.remove(function (err) {
      if (!err) {
        res.status(200).json({message: 'User removed'});
      } else {
       res.status(500).json({error: 'Server error'});
     } 
   });
  });
});

router.put('/:id', function (req, res) {
 user.findById(req.params.id, function (err, user) {
  if (!user) {
    res.status(404).json({error: 'User not found'});
  }
  user.update({
    username:req.body.username, 
    password:req.body.password
  },function (err) {
    if (err) 
    {
      res.status(500).json({error: 'Server error'});
    }
    if (err.name == 'ValidationError'){
      res.status(400).json({error: 'Validation Error'});
    }
    else {
      res.status(200).json({message: 'User updated'});
    }
  });
});
});

module.exports = router;