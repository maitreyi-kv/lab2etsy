const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Products = new Schema({
  Name: String,
  Price: String,
  number: Number
});

module.exports = mongoose.model('products', Products );
