const UserModel = require('../models/User');
const mongoose = require("mongoose");

const createUser = async (user) => {
  console.log("In creating user", user);
  new UserModel(user).save();
  return "Registered";
}

const getUser = async (user) => {
  return UserModel.findOne({Email: user.Email});
}

module.exports = { createUser, getUser }
