var app = require('koa')();
var mongoose = require('mongoose');
var router = require('koa-router');
var parser = require('koa-bodyparser');
mongoose.connect('mongodb://localhost/user2');
var usersController = require('./user-controller');

usersController(router);
app.use(parser());
app.use(router.routes());
app.listen(8000);
