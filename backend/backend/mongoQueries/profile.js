const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const mongoose = require("mongoose");

const updateProfileQuery = async (req) => {
  console.log("Edit Profile", req);
  const {Name, Phone, City, Country, Address, ImageURL, UserID} = req;
  let res = await UserModel.findByIdAndUpdate(UserID, {
    Name,
    Phone,
    City,
    Country,
    Address,
    ImageURL
  }, {safe: true, upsert: true});
  return res;
}

const getProfileQuery = async (req) => {
  console.log("Get Profile", req);
  return UserModel.findById(req.UserID).select("Name Phone City Country Address ImageURL");
}

module.exports = {updateProfileQuery, getProfileQuery}
