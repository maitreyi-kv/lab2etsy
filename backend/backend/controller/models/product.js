// File: ./models/somemodel.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var Products = new Schema({
  Name: String,
  Price: String,
  number: Number
});

//Export function to create "SomeModel" model class
module.exports = mongoose.model('products', Products );
