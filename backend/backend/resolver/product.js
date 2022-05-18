const UserModel = require('../models/User');
const ProductModel = require('../models/Product');


const mongoose = require("mongoose");

const addProductResolver = async ({product}) => {

  product = JSON.parse(JSON.stringify(product));
  console.log("Input product to resolver", product)
  const pro = new ProductModel({ ...product, QuantitySold: 0});
  const res = await pro.save();
  console.log("Added product via Graphql", JSON.stringify(res))
  return "Added Product"
}





module.exports = { addProductResolver }
