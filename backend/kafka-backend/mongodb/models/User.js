const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  Email: String,
  Password: String,
  Name: String,
  Address: String,
  Country: String,
  City: String,
  Phone: String,
  ImageURL: String,
  Favorites: Array,
  ShopName: String,
  Orders: [{
    Order: Array,
    Date: {type: Date, default: Date.now},
    TotalPrice: Number,
    OrderID: String
  }]
});

module.exports = mongoose.model('users', User );
