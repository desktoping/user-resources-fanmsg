var jade = require('jade');
var User = require('./models/user');
module.exports = function(router){
	router.get('/', function *(){
		var html = jade.renderFile('main.jade');
		this.body = html;
	});
	router.get('/users', function *(){
		var data = yield User.find();
		var html = jade.renderFile('find.jade',data);
		this.body = html;
	});
	router.post('/users/', function *(){
		var user = new User(this.request.body);
		var data = yield user.save();
		var html = jade.renderFile('create.jade',this.request.body);
		this.body = html;
	});
	router.delete('/users/:user', function *(){
		console.log('here');
		var data = yield User.remove(this.params);
		var html = jade.renderFile('delete.jade',this.request.body);
		this.body = html;
	});
	router.patch('/users/:user', function *(){
		var data = yield User.update(this.params,{ pass: 'changed'});
		var html = jade.renderFile('update.jade',this.request.body);
		this.body = html;
	});
};