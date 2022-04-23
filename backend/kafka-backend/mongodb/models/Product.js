const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const Schema = mongoose.Schema;

const Products = new Schema({
  Name: String,
  Price: String,
  CreatedBy: String
});

module.exports = mongoose.model('products', Products );
