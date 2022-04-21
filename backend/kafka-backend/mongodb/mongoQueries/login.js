const UserModel = require('../models/User');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const createUser = async (user) => {
  console.log("In creating user", user);
  new UserModel(user).save();
  return "Registered";
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

const getUser = async (user) => {
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //         if (err) return cb(err);
  //         cb(null, isMatch);
  //     });
  let resp = UserModel.findOne({Email: user.Email});
  return resp;
}

module.exports = { createUser, getUser }
