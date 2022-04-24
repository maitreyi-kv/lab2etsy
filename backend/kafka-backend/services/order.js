const {createOrderQuery, postOrderQuery, getOrderQuery} = require('../mongodb/mongoQueries/order');

function createOrder(msg, callback) {
  createOrderQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}

function getOrder(msg, callback) {
  getOrderQuery(msg).then(r => {
    callback(null, r)
  }).catch(err => console.log("Err======", err));
}


module.exports = { createOrder, getOrder };
