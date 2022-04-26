var bodyParser = require('body-parser');
var productsRoute = require('./routes/products');
var productRoute = require('./routes/product');
var favoriteRoute = require('./routes/favorite');
var shopRoute = require('./routes/shop');
var s3Route = require('./routes/s3');
var authRoute = require('./routes/auth');
var orderRoute = require('./routes/order');
var profileRoute = require('./routes/profile');
const passport = require('passport');

// const {check, param, validationResult} = require('express-validator');

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(passport.initialize());

require('./routes/passportCode');

app.use("/products", productsRoute)
//changed / from this
app.use("/product", productRoute)
app.use("/s3image", s3Route)
app.use("/auth", authRoute)
app.use("/favorite", favoriteRoute)
app.use("/shop", shopRoute)
app.use("/order", orderRoute)
app.use("/user", profileRoute)

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
