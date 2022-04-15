// const mongoose = require('mongoose');

// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

// main().then(res => console.log("Successful", res)).catch(err => console.log(err));



// let conn

// async function getConn() {
//     conn = await mongoose.createConnection(URL)
// }

// getConn().then(r => console.log("conmn state", conn.readyState)).catch(err => console.log("Err", err))

// var mongoose = require('mongoose');
// mongoose.connect();
// mongoose.Promise = global.Promise;

// var Product = mongoose.model('Products', { Name: String, Price: String, number: Number });

// var kitty = new Product({ Name: 'Zildjian' });
// kitty.save(function (err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('meow');
//   }
// });


const mongoose = require("mongoose");

const URL = 'mongodb+srv://etsyuser:AnjsCNJWArTnll5Q@etsy-clone.xiwsj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const mongooseConnection = mongoose.connect(URL)
                                    .then(req => console.log(req))
                                    .catch((err)=>{
                                            console.log(err.message);
                                        });                                        

module.exports = mongooseConnection