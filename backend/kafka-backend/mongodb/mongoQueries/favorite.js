const UserModel = require('../models/User');
const mongoose = require("mongoose");
const {_getProductByID} = require('./products');

const favToggle = async (req) => {
  console.log("toggle fav", req);
  const {productID, UserID, action} = req;
  if(action) {
    console.log("In aciton", action, UserID, productID)
    return UserModel.findByIdAndUpdate(UserID, {
      $push: {
        Favorites: productID,
      },
    },{safe: true, upsert: true});
  }

  return UserModel.findByIdAndDelete(UserID, {
    $pullAll: {
      Favorites: productID,
    },
  });
}

const getFavProducts = async (req) => {
  console.log("fav products", req);
  const { UserID } = req;
  let favorite = await UserModel.findById(UserID).select("Favorites").lean();
  console.log("Favv", UserID, favorite);
  if(favorite?.Favorites) {
    let {Favorites} = favorite;
    let products = [];
    if (Favorites) {
      console.log("Favvvhere?")
      for (let idx in Favorites) {
        let productID = Favorites[idx];
        let pro = await _getProductByID(productID);
        products.push(pro);
      }
      return products;
    }
  }
  return {"message": "No favorites"};
}

module.exports = { favToggle, getFavProducts }
