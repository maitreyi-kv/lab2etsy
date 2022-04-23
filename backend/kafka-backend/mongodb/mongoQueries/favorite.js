const UserModel = require('../models/User');
const mongoose = require("mongoose");

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

module.exports = { favToggle }
