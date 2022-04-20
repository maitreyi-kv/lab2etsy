var bodyParser = require('body-parser');
// var session = require('express-session');
var productsRoute = require('./routes/products');
var productRoute = require('./routes/product');
var s3Route = require('./routes/s3');
var authRoute = require('./routes/auth');
// const {check, param, validationResult} = require('express-validator');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');
// app.set('view engine', 'ejs');

// //use cors to allow cross origin resource sharing
// app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

var express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
app.use(bodyParser.json());

app.use("/products", productsRoute)
//changed / from this
app.use("/product", productRoute)
app.use("/s3image", s3Route)
app.use("/auth", authRoute)

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
