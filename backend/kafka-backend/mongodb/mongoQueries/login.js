const UserModel = require('../models/User');
const mongoose = require("mongoose");

const createUser = async (user) => {
  console.log("In creating user")
  return new UserModel(user).save();
}

// const getAllProducts = async (msg) => {
//   let {search} = msg
//   let searchText = {}
//   if(search) searchText = {Name: {'$regex': search}}
//   console.log("Search text", searchText);
//   let resp = ProductModel.find(searchText);
//   console.log("Resp search", resp);
//   return resp;
// }

const getUser = async (emailID) => {
  return UserModel.findOne({Email: emailID});
}

module.exports = { getUser, createUser }
