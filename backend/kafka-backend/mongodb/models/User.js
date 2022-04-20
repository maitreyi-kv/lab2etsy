const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  Email: String,
  Password: String
});

module.exports = mongoose.model('users', User );
