var kafka = require('../kafka/client');
const express=require("express");
const { kafkaTopic } = require('../../constants');
const {checkAuth} = require('./passportCode');
const decodedJWT = require('./utils');

const router=express.Router()

router.post('/', checkAuth, function(req, res){
    console.log("In fav product")
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = req.body
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID;
    console.log("payload", payloadObj, req.body);
    kafka.make_request(kafkaTopic.addFavorite , payloadObj, function(err,results) {
        if (err){
            res.json({
                status:"error",
                msg:"System Error, Try Again.", err
            })
        }else{
            console.log("Inside else");
                res.json(results);
                res.end();
            }
    });
});

router.get('/', checkAuth, function(req, res){
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


module.exports=router
