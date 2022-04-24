const kafka = require('../kafka/client');
const express=require("express");
const { kafkaTopic } = require('../../constants');
const decodedJWT = require('./utils');
const {checkAuth} = require('./passportCode');

const router=express.Router()

router.post('/', function(req, res){
  console.log("In order");
  const jwtTokenDecoded = decodedJWT(req.get('authorization'));
  let payloadObj = { ...req.body, ...req.query}
  if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
  console.log("jwtttt", jwtTokenDecoded, req.get('authorization'), payloadObj);
  kafka.make_request(kafkaTopic.postOrder, payloadObj,  function(err, results) {
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

router.get('/', checkAuth, function(req, res){
  console.log("get order");
  const jwtTokenDecoded = decodedJWT(req.get('authorization'));
  let payloadObj = { }
  if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
  console.log("jwtttt", jwtTokenDecoded, req.get('authorization'), payloadObj);
  kafka.make_request(kafkaTopic.getOrder, payloadObj,  function(err, results) {
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
