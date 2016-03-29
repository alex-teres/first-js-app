var express = require('express');
var router = express.Router();
var article = require('../model/article');

router.get('/', function(req,res) {

});

router.get('/', function (req, res) {
  return article.find(function (err, article) {
    if (!err) {
      return res.send(article);
    } else {
      res.statusCode = 500;
      log.error(res.statusCode, err.message);
      return res.send('Server error');
    }
  })
});

router.get('/id:', function (req, res) {
  article.findById(req.params.id, function (err, article) {
    if (err) throw err;
    if (!articleID) {
      res.statusCode = 404;
      return res.send('article not found')
    }
  })
});

router.post('/', function (req, res) {
  var article = new article({articleID: "1", text: "ksadjfhlksjdfhlksjdfhklsjdf", tag: "firstTag", theme: "Test"});
  if (err) {
    res.statusCode = 500;
    log.error(res.statusCode, err.message);
    return res.send('Server error');
  }
  else {
    article.save();
    return res.send('article created')
  }
});

router.delete('/', function (req, res) {
  if (!article) {
    res.statusCode = 404;
    return res.send('Not found');
  }
  return article.remove(function (err) {
    if (!err) {
      return res.send("article removed");
      return res.send('OK');
    } else {
      res.statusCode = 500;
      return res.send('Server error');
    }
  });
});

router.put('/:id', function (req, res) {
  return article.findById(req.params.id, function (err, article) {
    if (!article) {
      res.statusCode = 404;
      return res.send('Not found');
    }

    article.id = req.body.id;
    article.text = req.body.text;
    article.tag = req.body.tag;
    article.theme = req.body.theme;

    return article.save(function (err) {
      if (!err) {
        return res.send('article updated');
      } else {
        if (err.article == 'ValidationError') {
          res.statusCode = 400;
          res.send('Validation error');
        } else {
          res.statusCode = 500;
          res.send('Server error');
        }
      }
    });
  });
});

module.exports = router;