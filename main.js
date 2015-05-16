var app = require('koa')();
var mongoose = require('mongoose');
var router = require('koa-router')();
var parser = require('koa-bodyparser');
var passport = require('koa-passport');
require('./config/passport')(passport); 

var model = require('./models/oauthModel');
var oauthserver = require('koa-oauth-server');

app.oauth = oauthserver({
  
  model: model,
  grants: ['password'],
  debug: true
});
router.post('/auth', function *(){
	app.oauth.grant();
	
});

mongoose.connect('mongodb://localhost/user2');
var usersController = require('./user-controller');
app.use(parser());
app.use(router.routes());
usersController(router);
app.listen(8000);
