var kafka = require('../kafka/client');
// Importing the module
const express=require("express");
const { kafkaTopic } = require('../../constants');
const passport = require('passport');

// Creating express Router
const router=express.Router()
require('./passportCode');

// passport.authenticate('local', {session: false} ),
router.post('/', passport.authenticate('jwt', {session: false} ), function(req, res){
    console.log("In post product")
    kafka.make_request(kafkaTopic.addProduct , req.body, function(err,results) {
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

router.get('/:id', function(req, res){
    console.log("In Add product", req.params.id)
    kafka.make_request(kafkaTopic.getProduct, req.params.id,  function(err, results) {
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
