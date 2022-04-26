var kafka = require('../kafka/client');
const express=require("express");
const { kafkaTopic } = require('../../constants');
const {checkAuth} = require('./passportCode');
const decodedJWT = require('./utils');

const router=express.Router()

router.post('/profile', checkAuth, function(req, res){
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = req.body
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID;
    console.log("payload", payloadObj, req.body);
    kafka.make_request(kafkaTopic.editProfile , payloadObj, function(err,results) {
        if (err){
            res.json({
                status:"error",
                msg:"System Error, Try Again.", err
            })
        }else{
            console.log("Inside login else");
                res.json(results);
                res.end();
            }
    });
});

router.get('/profile', checkAuth, function(req, res){
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = {}
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID;
    console.log("payload", payloadObj, req.body);
    kafka.make_request(kafkaTopic.getProfile , payloadObj, function(err,results) {
        if (err){
            res.json({
                status:"error",
                msg:"System Error, Try Again.", err
            })
        }else{
            console.log("Inside login else");
            res.json(results);
            res.end();
        }
    });
});


module.exports=router
