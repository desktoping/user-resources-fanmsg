// initializing global variables
var koa = require('koa');
var app = koa();
var mount = require('koa-mount');
var router = require('koa-router');
var mongoose = require('mongoose');
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
var handler = function *(next){
    app.body = {'Welcome': 'This is a level 2 Hello World Application!!'};
	console.log(app);
	// mongoose code to display current users lists
};

//transforming page
testRoute.get('/users', function *(){
	this.body = ('Welcome2');
    var data = yield Model.find({pass: '1234'});
	console.log(data);
	this.body = data;
});
testRoute.get('/index', handler);
app.use(mount('/users', testRoute.middleware()));

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