const kafka = require('../kafka/client');
const express=require("express");
const { kafkaTopic } = require('../../constants');
const decodedJWT = require('./utils');
const {checkAuth} = require('./passportCode');

const router=express.Router()

router.get('/', checkAuth, function(req, res){
  console.log("In get shop /");
  const jwtTokenDecoded = decodedJWT(req.get('authorization'));
  let payloadObj = { ...req.body, ...req.query}
  if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
  console.log("Get Shop exists", jwtTokenDecoded, req.get('authorization'), payloadObj);
  kafka.make_request(kafkaTopic.getShop, payloadObj,  function(err, results) {
    if (err){
      res.json({
        status:"error",
        msg:"System Error, Try Again."
      })
    }else{
      console.log("Inside else");
      res.json(results);
      res.end();
    }

  });
});

router.get('/products', function(req, res){
  console.log("In get shop /");
  const jwtTokenDecoded = decodedJWT(req.get('authorization'));
  let payloadObj = { ...req.body, ...req.query}
  if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
  console.log("Get shop jwt", jwtTokenDecoded, req.get('authorization'), payloadObj);
  kafka.make_request(kafkaTopic.getShopDetails, payloadObj,  function(err, results) {
    if (err){
      res.json({
        status:"error",
        msg:"System Error, Try Again."
      })
    }else{
      console.log("Inside else");
      res.json(results);
      res.end();
    }

  });
});

router.post('/availability', function(req, res){
  console.log("In avail shop");
  const jwtTokenDecoded = decodedJWT(req.get('authorization'));
  let payloadObj = { ...req.body, ...req.query}
  if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
  console.log("jwtttt", jwtTokenDecoded, req.get('authorization'), payloadObj);
  kafka.make_request(kafkaTopic.getShopAvailability, payloadObj,  function(err, results) {
    if (err){
      res.json({
        status:"error",
        msg:"System Error, Try Again."
      })
    }else{
      console.log("Inside else");
      res.json(results);
      res.end();
    }

  });
});

router.post('/create', checkAuth, function(req, res) {
  console.log("In creatre shop====");
  const jwtTokenDecoded = decodedJWT(req.get('authorization'));
  let payloadObj = { ...req.body, ...req.query}
  if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
  console.log("In create shop", jwtTokenDecoded, req.get('authorization'), payloadObj);
  kafka.make_request(kafkaTopic.createShop, payloadObj,  function(err, results) {
    if (err){
      res.json({
        status:"error",
        msg:"System Error, Try Again."
      })
    }else{
      console.log("Inside else");
      res.json(results);
      res.end();
    }

  });
});



module.exports=router
