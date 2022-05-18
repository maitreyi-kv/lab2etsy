var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');
const cors = require('cors');
const mongoose = require("mongoose");
const {registerUserResolver, updateProfileResolver} = require('./resolver/user');
const {addProductResolver} = require('./resolver/product');

const URL = 'mongodb+srv://etsyuser:AnjsCNJWArTnll5Q@etsy-clone.xiwsj.mongodb.net/etsy-clone'
mongoose.connect(URL).then(() => console.log("Connected")).catch(err => console.log("Err in connection", err));

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  input RegsiterUser {
    Name: String
    Password: String
    Email: String
  }
  
  input UserProfileInput {
      Email: String
      Password: String
      Name: String
      Address: String
      Country: String
      City: String
      Phone: String
      ImageURL: String
  }
  
  input ProductInput {
      Name: String
      Price: String
      Description: String
      ImageURL: String
      QuantityAvailable: Int
      Category: String
      ShopName: String
      UserID: String  
  }
  
  type UserProfile {
      Email: String
      Password: String
      Name: String
      Address: String
      Country: String
      City: String
      Phone: String
      ImageURL: String
  }
  
  type Product {
      id: ID!
      Name: String
      Price: String
      Description: String
      ImageURL: String
      QuantityAvailable: Int
      Category: String
      ShopName: String
      UserID: String  
  }
  
  type Order {
      id: ID!
      OrderID: Int
      Name: String
      Price: String
      Description: String
      ImageURL: String
      Category: String
      ShopName: String
      UserID: String  
  }
  
  type Shop {
      id: ID!
      ShopName: String
      UserID: String
      ShopImageURL: String
  }
  
  type Query {
    getUser(Email: String, ID: String): UserProfile
    getShopDetails(Name: String!): Shop
    getProducts(Name: String, ID: String, excludeID: String): [Product]
    getPurchasedOrders(UserID: String): [Order]
  }
  
  type Mutation {
    registerUser(Name: String!, Password: String!, Email: String!): String
    updateUser(UserProfile: UserProfileInput!): String
        
    addProduct(product: ProductInput!): String
    updateProduct(product: ProductInput!): String
    
    addShop(shop: Shop): Shop
    updateShop(shop: Shop): Shop
    
    purchaseOrder(orders: [Order]): [Order]
    
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
    registerUser: registerUserResolver,
    updateProfile: updateProfileResolver,
    addProduct: addProductResolver
};

var app = express();

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
