const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Shop = new Schema({
  ShopName: String,
  UserID: String
});

module.exports = mongoose.model('shop', Shop );
