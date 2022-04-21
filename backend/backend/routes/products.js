var kafka = require('../kafka/client');
// Importing the module
const express=require("express");
const { kafkaTopic } = require('../../constants');

// Creating express Router
const router=express.Router()

router.get('/', function(req, res){
    console.log("Get products ===", req.body, req.query)
    kafka.make_request(kafkaTopic.getProducts, { ...req.body, ...req.query },  function(err, results) {
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
