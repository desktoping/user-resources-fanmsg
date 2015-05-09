var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
    user: String,
    pass: String
});