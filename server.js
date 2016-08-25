var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var User = require('./app/model/user');
var Article = require('./app/model/article')(app);
var Category = require('./app/model/category')();
var users = require('./app/routes/user')(app);
var articles = require('./app/routes/article')(app);
var categories = require('./app/routes/category')();
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
	res.set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
	res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");

	if ('OPTIONS' == req.method) {
		res.send(200);
	} else {
		next();
	}
});

app.get('/api', function(req, res) {
	res.status(200).json({message: 'Server running'});
});
app.use('/api/auth',auth);
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/categories', categories);

app.use('/api/articles', crudRouter(Article));
app.use('/api/users', crudRouter(User));
app.use('/api/userGroups', crudRouter(userGroups));
app.use('/api/categories', crudRouter(Category));

app.use('/api/uploads', express.static('uploads'));
app.use('/api/json', express.static('json'));

app.listen(process.env.PORT || 8080);