// initializing global variables
var koa = require('koa');
var app = koa();
var mount = require('koa-mount');
var router = require('koa-router');
var mongoose = require('mongoose');
var parser = require('body-parser');

mongoose.connect('mongodb://localhost/user2');
var query = "";

// initializing variables
var userSchema = new mongoose.Schema({
	user: String,
	pass: String
});
var Model = mongoose.model('user2',userSchema);
var testRoute = new router();
var Query = new Model({user: "red", pass: "1234"});

// custom functions
var print = function *(d){
		yield d;
		console.log(d);
		this.type = 'json';
		this.status = 200;
		this.body = 'Welcome %s',d;
};
var callback = function (err, data) {
	query = data;
	//console.log(query);
	if (err) return console.error(err);
	else
		console.log('retrieving...');
		print(query);
		console.log('end retieve.');
};


//transforming page
testRoute.get('/users/:user', function *(){
   var data = yield Model.find(this.params);
	this.body = ''+data;
});


testRoute.get('/', function *(){
	this.body = ('Welcome use /users/ to add. /users/:user to find. /usersave/:user to update. /delete/:user to remove.');
});

testRoute.get('/user', function *(){
	var newUser = new Model({user: 'new',pass: 'old'});
	newUser.save();
	this.body = ('User new with password old is created.');
});


testRoute.get('/delete/:user', function *(){
	yield Model.remove(this.params);
	this.body = 'Successfully deleted '+this.params;
});


testRoute.get('/usersave/:user', function *(){
	yield Model.update(this.params,{ pass: 'ww3'});
	this.body = 'Password updated for '+this.params+' to ww3';
});

app.use(testRoute.routes());

//creating page
app.listen(8000);
// adD.save(function (err) {
  // if (err) {
		// return err;
  // }
  // else {
  	// console.log("Post saved");
  // }
// });