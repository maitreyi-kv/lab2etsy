const {createProducts, getAllProducts} = require('../mongodb/connection');

function createProduct(msg, callback) {

    console.log("Inside book kafka backend", msg);
    createProducts(msg).then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
};

function getProduct(_, callback) {

    console.log("Inside book kafka backend", _);
    getAllProducts().then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
};

module.exports = { createProduct, getProduct };


