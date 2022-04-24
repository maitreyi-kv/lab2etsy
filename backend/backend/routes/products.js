const kafka = require('../kafka/client');
const express=require("express");
const { kafkaTopic } = require('../../constants');
const decodedJWT = require('./utils');
const {checkAuth} = require('./passportCode');

const router=express.Router()

router.get('/', function(req, res){
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = { ...req.body, ...req.query}
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
    console.log("jwtttt", jwtTokenDecoded, req.get('authorization'));
    kafka.make_request(kafkaTopic.getProducts, payloadObj,  function(err, results) {
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

router.get('/favorite', checkAuth, function(req, res){
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = { ...req.body, ...req.query}
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
    console.log("jwtttt", jwtTokenDecoded, req.get('authorization'));
    kafka.make_request(kafkaTopic.getFavoriteProducts, payloadObj,  function(err, results) {
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

router.get('/category', checkAuth, function(req, res){
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = { ...req.body, ...req.query}
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID
    console.log("Catergory jwt", jwtTokenDecoded, req.get('authorization'));
    kafka.make_request(kafkaTopic.getCategory, payloadObj,  function(err, results) {
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
