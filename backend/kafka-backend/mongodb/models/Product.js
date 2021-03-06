const mongoose = require('mongoose');
const {ObjectID} = require('mongodb');

const Schema = mongoose.Schema;

const Products = new Schema({
  Name: String,
  Price: String,
  Description: String,
  ImageURL: String,
  QuantityAvailable: Number,
  QuantitySold: Number,
  Category: String,
  ShopName: String,
  UserID: String
});

module.exports = mongoose.model('products', Products );
