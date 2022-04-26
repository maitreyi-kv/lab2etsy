const ProductModel = require('../models/Product');
const UserModel = require('../models/User');

const mongoose = require("mongoose");

const createProductsQuery = async (product) => {
  console.log("Before writing...", product);
  const pro = new ProductModel({...product, QuantitySold: 0});
  return pro.save();
}

const getAllProducts = async (msg) => {
  let {search, UserID} = msg
  let searchText = {}
  if(search) searchText.Name = {'$regex': search}
  if(UserID) searchText.UserID = { '$ne': UserID }
  console.log("Search text", msg, searchText);
  let products = await ProductModel.find(searchText).lean();
  console.log("Resp search", products);
  // let isFavorite = false
  if(UserID) {
    let favorite = await UserModel.findById(msg.UserID).select("Favorites");
    if(favorite?.Favorites) {
      let {Favorites} = favorite;
      for (let idx in products) {
        let product = products[idx];
        console.log("Product", product._id);
        products[idx].isFavorite = !!Favorites.includes(product._id);
      }
    }
  }
  return products;
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

const updateProductsQuery = async (req) => {
  let {product} = req
  return ProductModel.findByIdAndUpdate(product._id, {
    Name: product.Name,
    Quantity: product.Quantity
  }).lean();
}

const _getProductByID = async (id) => {
  let pro = await ProductModel.findById(id).lean();
  pro.isFavorite = true;
  console.log("proo", pro, id);
  return pro;
}

module.exports = { createProductsQuery, getAllProducts, getProductByID, _getProductByID, updateProductsQuery }
