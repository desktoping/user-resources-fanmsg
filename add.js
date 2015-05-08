var app = require('koa')();
var router = require('koa-route');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/user2');

var userSchema = new mongoose.Schema({
	user: String,
	pass: String
});

var Model = mongoose.model('user2',userSchema);
var Query = new Model({user: "red", pass: "1234"});
console.log(Query);

var print = function *(d){
		yield d;
		console.log(d);
		this.type = 'json';
		this.status = 200;
		app.body = 'Welcome %s',d;
};
print('g')
var callback = function (err, data) {
	var string = data;
	//console.log(string);
	if (err) return console.error(err);
	else
		console.log('retrieving...');
		print(string);
		console.log('end retieve.');
};
  
var t = Model.find({pass: '1234' } , callback);
//console.log(t);
app.listen(8000);
// adD.save(function (err) {
  // if (err) {
		// return err;
  // }
  // else {
  	// console.log("Post saved");
  // }
// });