const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const mongoose = require("mongoose");

const createOrderQuery = async (req) => {
  console.log("Craete order", req);
  const {UserID, Order, TotalPrice, OrderID} = req;

  console.log("In order", UserID, Order, TotalPrice, OrderID)
  let res = await UserModel.findByIdAndUpdate(UserID, {
    $push: {
      Orders: { Order: Order,  TotalPrice, OrderID},
    },
  },{safe: true, upsert: true});

  for(let order in Order) {
    console.log("In order===", order)
    let updateOrder = await ProductModel.findByIdAndUpdate(Order[order]._id,
      { "$inc": { QuantityAvailable: -Order[order].QuantityChoosen } }
    ,{safe: true, upsert: true});

    console.log("Update order", updateOrder)
    await ProductModel.findByIdAndUpdate(Order[order]._id,
      { "$inc": { QuantitySold: Order[order].QuantityChoosen } }
      ,{safe: true, upsert: true});

    console.log("Updated value of product", Order[order].QuantityChoosen)
  }
  return res;
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
