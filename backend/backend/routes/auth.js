var kafka = require('../kafka/client');
// Importing the module
const express=require("express");
const { kafkaTopic } = require('../../constants');


const router=express.Router()

router.post('/login', function(req, res){

    kafka.make_request(kafkaTopic.login , req.body, function(err,results) {
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

router.post('/register', function(req, res){

    kafka.make_request(kafkaTopic.register , req.body, function(err,results) {
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
