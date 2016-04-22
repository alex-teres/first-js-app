var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var app = express();
var users = require('./app/routes/user');
var articles = require('./app/routes/article');
var crudRouter = require('./app/routes/crudRouter');
var Article = require('./app/model/article')(app);
var User = require('./app/model/user');
var auth = require('./app/routes/auth.js');
var conf = require('./config');
var jwtstrategy = require('./app/auth/jwt.strategy')(app);
var userGroups = require('./app/model/userGroups');

var mongoose = require('mongoose');
mongoose.connect(conf.dataBase);

app.use(bodyParser());
app.use('/', express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.status(200).json({message: 'Server running'});
});
app.use('/auth',auth);
app.use('/users', users);
app.use('/articles', articles);

app.use('/articles', crudRouter(Article));
app.use('/users', crudRouter(User));
app.use('/usergroups', crudRouter(userGroups));

app.listen(8080);