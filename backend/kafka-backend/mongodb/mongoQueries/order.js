const UserModel = require('../models/User');
const mongoose = require("mongoose");

const createOrderQuery = async (req) => {
  console.log("Craete order", req);
  const {UserID, Order} = req;

  console.log("In order", UserID, Order)
  return UserModel.findByIdAndUpdate(UserID, {
    $push: {
      Orders: Order,
    },
  },{new: true, safe: true, upsert: false});

}

const getOrderQuery = async (req) => {
  console.log("Post order", req);
  const {UserID} = req;
  console.log("In order")
  let res = await UserModel.findById(UserID).select("Orders");
  console.log("Order res", res);
  return res;
}

module.exports = { createOrderQuery, getOrderQuery }
