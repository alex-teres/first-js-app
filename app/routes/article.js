var express = require('express');
var router = express.Router();
var article = require('../model/article');

router.get('/asdf', function (req, res) {
  res.json({foo:'bar'});
});

module.exports = router;