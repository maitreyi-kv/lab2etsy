const UserModel = require('../models/User');
const mongoose = require("mongoose");

const createOrderQuery = async (req) => {
  console.log("Craete order", req);
  const {UserID, Order, TotalPrice, OrderID, NumberOfItems} = req;

  console.log("In order", UserID, Order, TotalPrice, OrderID, NumberOfItems)
  return UserModel.findByIdAndUpdate(UserID, {
    $push: {
      Orders: { Order: Order,  TotalPrice, OrderID, NumberOfItems  },
    },
  },{safe: true, upsert: true});

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
