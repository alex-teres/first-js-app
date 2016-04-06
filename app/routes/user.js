var express = require('express');
var router = express.Router();
var user = require('../model/user');

router.get('/nonStand', function (req, res) {
	res.json({foo:'bar'});
});
router.post('/auth',function(req,res) { 
	res.send('hello')
	});

module.exports = router;