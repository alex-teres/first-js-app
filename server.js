var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var User = require('./app/model/user');
var Article = require('./app/model/article')(app);
var Category = require('./app/model/category')();
var Tag = require('./app/model/tag')();
var users = require('./app/routes/user')(app);
var articles = require('./app/routes/article')(app);
var categories = require('./app/routes/category')();
var crudRouter = require('./app/routes/crudRouter');
var auth = require('./app/routes/auth.js');
var conf = require('./config');
var fs = require('fs');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

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

app.listen(process.env.PORT || 8080);

require('./app/chat')(app);

app.get('/', function (req, res) {
	res.json({ok:'ok'});
});

app.get('/api', function(req, res) {
	res.status(200).json({message: 'Server running'});
});
app.use('/api/auth',auth);
app.use('/api/users', users);
app.use('/api/articles', articles);
app.use('/api/categories', categories);

app.use('/api/articles', crudRouter(Article, {noAuth: []}));
app.use('/api/users', crudRouter(User, {noAuth: ['get','post']}));
app.use('/api/userGroups', crudRouter(userGroups, {noAuth: []}));
app.use('/api/categories', crudRouter(Category, {noAuth: []}));
app.use('/api/tags', crudRouter(Tag, {noAuth: []}));

app.use('/api/uploads', express.static('uploads'));
app.use('/api/json', express.static('json'));