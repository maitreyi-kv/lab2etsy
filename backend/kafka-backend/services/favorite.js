const jwt = require('jsonwebtoken');
const {favToggle, getFavProducts} = require('../mongodb/mongoQueries/favorite');

function favoriteAdd(msg, callback) {
  console.log("Inside fav add ", msg);
  favToggle(msg).then(async userExists => {
    if (userExists) callback(null, userExists);
    callback(null, {});
  }).catch(err => console.log("ERR", err));
}

function getFavoriteProducts(msg, callback) {
  console.log("Inside get fav products ", msg);
  getFavProducts(msg).then(async userExists => {
    if (userExists) callback(null, userExists);
    callback(null, {});
  }).catch(err => console.log("ERR", err));
}

module.exports = {favoriteAdd, getFavoriteProducts};


