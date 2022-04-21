const ProductModel = require('../models/Product');
const mongoose = require("mongoose");

const createProducts = async (product) => {
  const pro = new ProductModel(product);
  return pro.save();
}

const getAllProducts = async (msg) => {
  let {search} = msg
  let searchText = {}
  if(search) searchText = {Name: {'$regex': search}}
  console.log("Search text", searchText);
  let resp = ProductModel.find(searchText);
  console.log("Resp search", resp);
  return resp;
}

const getProductByID = async (id) => {
  return ProductModel.findOne({number: Number.parseInt(id)})
}

module.exports = { createProducts, getAllProducts, getProductByID }