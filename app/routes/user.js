var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.get('/nonStand', function (req, res) {
    res.json({foo:'bar'});
});

module.exports = router;