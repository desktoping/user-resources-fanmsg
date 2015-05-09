var router = require('koa-router');
var User = require('./models/user');
module.exports = function(router){
	router.get('/users/', function *(){
		var data = yield User.find();
		this.body = ''+data;
	});
	router.post('/users/', function *(){
		console.log(this.request.body);
		//var data = yield User.save(this.request);
		//this.body = ''+data;
	});
};