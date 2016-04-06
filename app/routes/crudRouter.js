var express = require('express');

function routerFact(model) {
	var router = express.Router();
	router.get('/', function (req, res) {
		model.find(function (err, items) {
			res.status(200).json(items);
		});
	router.get('/:id', function (req, res) {
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
	router.delete('/:id', function (req, res) {
  items.findById(req.params.id, function (err, items){
    if (!items) {
      res.status(404).json({error: 'Not found'});
    }
    items.remove(function (err) {
      if (!err) {
        res.status(200).json({message: 'Items removed'});
      } else {
       res.status(500).json({error: 'Server error'});
     } 
   });
  });
});
	router.put('/:id', function (req, res) {
 items.findById(req.params.id, function (err, items) {
  if (!items) {
    res.status(404).json({error: 'items not found'});
  }
  items.update({},function (err) {
    if (err) 
    {
      res.status(500).json({error: 'Server error'});
    }
    if (err.name == 'ValidationError'){
      res.status(400).json({error: 'Validation Error'});
    }
    else {
      res.status(200).json({message: 'Items updated'});
    }
  });
});
});
	router.post('/', function (req, res) {

  var post = new items({

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

});

	return router
}

module.exports = routerFact;