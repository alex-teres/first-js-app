'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var users = require('./app/routes/user');
var articles = require('./app/routes/article');
var crudRouter = require('./app/routes/crudRouter');
var Article = require('./app/model/article');
var User = require('./app/model/user');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

app.use(bodyParser());

app.get('/', function(req, res) {
	res.status(200).json({message: 'Server running'})
});

app.use('/users', users);
app.use('/articles', articles);

app.use('/articles', crudRouter(Article));
app.use('/users', crudRouter(User));


app.listen(8080);