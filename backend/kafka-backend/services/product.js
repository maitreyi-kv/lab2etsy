const {createProducts, getAllProducts, getProductByID} = require('../mongodb/mongoQueries/products');


function createProduct(msg, callback) {

    console.log("Inside book kafka backend", msg);
    createProducts(msg).then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
};

function getProducts(msg, callback) {

    console.log("Inside get Product kafka backend", msg);
    getAllProducts(msg).then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
};

function getSingleProduct(msg, callback) {

    console.log("Inside get single product", msg);
    getProductByID(msg).then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
    return {"single": "product"};
};

module.exports = { createProduct, getProducts, getSingleProduct };


