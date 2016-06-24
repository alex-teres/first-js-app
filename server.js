var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var User = require('./app/model/user');
var Article = require('./app/model/article')(app);
var Category = require('./app/model/category')();
var users = require('./app/routes/user')(app);
var articles = require('./app/routes/article')(app);
var crudRouter = require('./app/routes/crudRouter');
var auth = require('./app/routes/auth.js');
var conf = require('./config');
require('./app/auth/jwt.strategy')(app);
var userGroups = require('./app/model/userGroups');

var mongoose = require('mongoose');
mongoose.connect(conf.dataBase);

app.use(bodyParser());

app.use(function (req, res, next) {

	res.set('Access-Control-Allow-Origin','*');
	res.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
	res.set("Access-Control-Allow-Headers", "Authorization, Content-Type")

	next();
});

app.get('/', function(req, res) {
	res.status(200).json({message: 'Server running'});
});
app.use('/auth',auth);
app.use('/users', users);
app.use('/articles', articles);

app.use('/articles', crudRouter(Article));
app.use('/users', crudRouter(User));
app.use('/userGroups', crudRouter(userGroups));
app.use('/categories', crudRouter(Category));



app.listen(8080);