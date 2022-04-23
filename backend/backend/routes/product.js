var kafka = require('../kafka/client');
// Importing the module
const express=require("express");
const { kafkaTopic } = require('../../constants');
const {checkAuth} = require('./passportCode');
const decodedJWT = require('./utils');
// const passport = require('passport');

// Creating express Router
const router=express.Router()

// passport.authenticate('local', {session: false} ),
router.post('/', checkAuth, function(req, res){
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
    console.log("In Add product", req.params.id, req.get('authorization'))
    const jwtTokenDecoded = decodedJWT(req.get('authorization'));
    let payloadObj = { id: req.params.id }
    if(jwtTokenDecoded) payloadObj.UserID = jwtTokenDecoded.UserID;
    console.log("JWT in ID", payloadObj);
    kafka.make_request(kafkaTopic.getProduct, payloadObj,  function(err, results) {
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
