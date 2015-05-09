var router = require('koa-router');
var routeHandler = module.exports = {};

routeHandler.testRoute = new router();

routeHandler.findAlone() = function *(){
	console.log(this);
	var data = yield model.find(this.params);
	this.body = ''+data;
};

routeHandler.findAll = function *(){
	testRoute.get('/users/', function *(){
		var data = yield Model.model1.find();
		this.body = ''+data;
	});
};

routeHandler.createNew = function *(){
	testRoute.get('/user', function *(){
		var newUser = new Model.model1({user: 'new',pass: 'old'});
		newUser.save();
		this.body = ('User new with password old is created.');
	});
};

routeHandler.erase = function *(){
	testRoute.get('/delete/:user', function *(){
		yield Model.model1.remove(this.params);
		this.body = 'Successfully deleted '+this.params;
	});
};

routeHandler.updateUser = function *(){
	testRoute.get('/usersave/:user', function *(){
		yield Model.model1.update(this.params,{ pass: 'ww3'});
		this.body = 'Password updated for '+this.params+' to ww3';
	});
};