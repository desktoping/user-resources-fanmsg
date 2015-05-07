var koa = require('koa');
var app = koa();
var router = require('koa-router');
var mount = require('koa-mount');
var mongoose = require('mongoose');

var db = 'mongodb://localhost/user';

// Create the database connection
mongoose.connect(db);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + db);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

var Schema = mongoose.Schema;

var users = new Schema({
  user:  String,
  pass: String
});
//var mod = mongoose.model('user2',users);

//mod.create({ size: 'small' }, function (err, small) {
  //if (err) return handleError(err);
  // saved!
//})
 
var handler = function *(next){
    this.body = {'Welcome': 'This is a level 2 Hello World Application!!'};
	// mongoose code to display current users lists
};

var handler2 = function *(next){
    this.body = {'Welcome2': 'This is a level 2 Hello World Application!!'};
	// mongoose code to add new user
};
 
var APIv1 = new router();
APIv1.get('/index', handler);
APIv1.post('/user', handler2);
 
app.use(mount('/', APIv1.middleware()));
if (!module.parent) app.listen(3000);
console.log('Hello World is Running on http://localhost:3000/');