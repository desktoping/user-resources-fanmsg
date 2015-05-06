// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = 'mongodb://localhost/user';

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI);
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
var mod = mongoose.model('user2',users);

mod.create({ size: 'small' }, function (err, small) {
  if (err) return handleError(err);
  // saved!
})
