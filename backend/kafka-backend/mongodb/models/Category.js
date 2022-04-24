const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const category = new Schema({
  category: String
});

module.exports = mongoose.model('category', category );
