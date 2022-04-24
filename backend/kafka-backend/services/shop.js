const {getShopQuery, getShopAvailabilityQuery, createStoreQuery, getShopDetailsQuery, getCategoryQuery} = require('../mongodb/mongoQueries/shop');

function getShop(msg, callback) {
  getShopQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

function getShopAvailability(msg, callback) {
  getShopAvailabilityQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

function createShop(msg, callback) {
  createStoreQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

function getShopDetails(msg, callback) {
  getShopDetailsQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

function getCategory(msg, callback) {
  getCategoryQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

module.exports = { getShop, getShopAvailability, createShop, getShopDetails, getCategory };
