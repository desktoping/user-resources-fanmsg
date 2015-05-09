var app = require('koa')();
var mongoose = require('mongoose');
var router = require('./route.js');
var parser = require('body-parser');

mongoose.connect('mongodb://localhost/user2');

var userSchema = new mongoose.Schema({
	user: String,
	pass: String
});

var Model = mongoose.model('user2',userSchema);


router.testRoute.get('/users/:user', function *(){
	router.findAlone(Model);
});


app.use(router.testRoute.routes());
app.listen(8000);
