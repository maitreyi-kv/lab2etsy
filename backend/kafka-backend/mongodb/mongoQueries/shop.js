const ShopModel = require('../models/Shop');
const UserModel = require('../models/User');
const mongoose = require("mongoose");
const {_getProductByID} = require('./products');
const ProductModel = require('../models/Product');
const CategoryModel = require('../models/Category');

const getShopQuery = async (req) => {
  const {UserID} = req;
  let shop = await UserModel.findById(UserID).select("ShopName Address").lean();
  console.log("Shop Querry!!", shop?.Address, shop?.ShopName);
  return {
    ShopName: shop?.ShopName ? shop?.ShopName : false,
    Address: shop?.Address ? shop?.Address : false
  };
}

const getShopAvailabilityQuery = async (req) => {
  const {ShopName} = req;
  let shop = await ShopModel.find({ShopName}).lean();
  return shop.length === 0;
}

const createStoreQuery = async (req) => {
  const {ShopName, UserID} = req;
  await new ShopModel({ShopName, UserID: UserID}).save();
  console.log("Shop created in shop collection");
  const createUserShop = await UserModel.findByIdAndUpdate(UserID, {
    ShopName: ShopName
  }, {new: true, upsert: true})
  console.log("Shop created in user collection")
  return createUserShop;
}

const getShopDetailsQuery = async (req) => {
  const {name, UserID} = req;
  let shop = await ShopModel.findOne({ShopName: name}).lean();
  console.log("Shop name + pbject", shop)
  const {UserID: ShopUserID} = shop
  console.log("Sho user id", ShopUserID, shop)
  let productsInShop = await ProductModel.find({ShopName: name}).lean();
  let userDetails = await UserModel.findById(ShopUserID).select("Name Phone City Country Address ImageURL").lean();
  console.log("can edit", ShopUserID === UserID);
  return {products: productsInShop, canEdit: ShopUserID === UserID, user: userDetails};
}

const getCategoryQuery = async () => {
  let cat = await CategoryModel.find({}).select("category").lean();
  cat_array = []
  for (let idx in cat) {
    cat_array.push(cat[idx].category);
  }
  return cat_array;
}

module.exports = {getShopQuery, getShopAvailabilityQuery, createStoreQuery, getShopDetailsQuery, getCategoryQuery}
