var app = require('koa')();
var serve = require('koa-static');
var mongoose = require('mongoose');
var router = require('koa-router')();
var parser = require('koa-bodyparser');
mongoose.connect('mongodb://localhost/user2');
var usersController = require('./user-controller');
app.use(parser());
app.use(router.routes());
usersController(router);
app.listen(8000);
