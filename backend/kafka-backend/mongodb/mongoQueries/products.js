const ProductModel = require('../models/Product');
const UserModel = require('../models/User');

const mongoose = require("mongoose");

const createProducts = async (product) => {
  const pro = new ProductModel(product);
  return pro.save();
}

const getAllProducts = async (msg) => {
  let {search, UserID} = msg
  let searchText = {}
  if(search) searchText.Name = {'$regex': search}
  if(UserID) searchText.CreatedBy = { '$ne': UserID }
  console.log("Search text", msg, searchText);
  let resp = ProductModel.find(searchText);
  console.log("Resp search", resp);
  return resp;
}

const getProductByID = async (req) => {
  let {id, UserID} = req
  let product = await ProductModel.findById(req.id).lean();
  console.log("Product", typeof product)
  let isFavorite = false
  if(UserID) {
    let favorite = await UserModel.findById(req.UserID).select("Favorites");
    if(favorite?.Favorites.includes(id)) {
      console.log("HEREE")
      isFavorite = true
      console.log("fav product", product);
    }
  }
  console.log("fav product", {...product, isFavorite});
  return { ...product, isFavorite: isFavorite };
}

module.exports = { createProducts, getAllProducts, getProductByID }
