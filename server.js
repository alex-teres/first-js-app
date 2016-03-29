'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var users = require('./app/routes/user');
var articles = require('./app/routes/article');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser());

app.get('/', function(req, res) {
	res.status(200).json({message: 'Server running'})
});

app.use('/users', users);
app.use('/articles', articles);

app.listen(8080);