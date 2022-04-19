var kafka = require('../kafka/client');
// Importing the module
const express=require("express");
const { kafkaTopic } = require('../../constants');

// Creating express Router
const router=express.Router()

router.post('/', function(req, res){

    kafka.make_request(kafkaTopic.addProducts , req.body, function(err,results) {
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

router.get('/', function(req, res){

    kafka.make_request(kafkaTopic.getProducts, req.body,  function(err, results) {
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
