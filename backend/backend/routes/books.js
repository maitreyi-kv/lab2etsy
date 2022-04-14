var kafka = require('../kafka/client');
// Importing the module
const express=require("express")
  
// Creating express Router
const router=express.Router()

router.post('/', function(req, res){

    kafka.make_request('posts',req.body, function(err,results) {
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});

module.exports=router
