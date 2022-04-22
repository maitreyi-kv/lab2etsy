const kafka = require('../kafka/client');
const express=require("express");
const { kafkaTopic } = require('../../constants');
const decodedJWT = require('./utils');

const router=express.Router()

router.get('/', function(req, res){
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = {}
    if(jwtTokenDecoded) payloadObj._id = jwtTokenDecoded.id
    kafka.make_request(kafkaTopic.getProducts, { ...req.body, ...req.query},  function(err, results) {
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
