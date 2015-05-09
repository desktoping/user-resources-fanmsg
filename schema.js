var mongoose = require('mongoose');
var schema = module.exports = {};

schema.userSchema = new mongoose.Schema({
	user: String,
	pass: String
});

