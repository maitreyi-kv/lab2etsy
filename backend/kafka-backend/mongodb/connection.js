const mongoose = require("mongoose");
const ProductModel = require('./models/Product');

const URL = 'mongodb+srv://etsyuser:AnjsCNJWArTnll5Q@etsy-clone.xiwsj.mongodb.net/etsy-clone'
mongoose.connect(URL).then(() => console.log("Connected")).catch(err => console.log("Err", err));


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




