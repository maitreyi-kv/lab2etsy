var kafka = require('../kafka/client');

function makeRequest(topicName, req) {
    kafka.make_request(topicName, req.body, function(err,results) {
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            return {
                status:"error",
                msg:"System Error, Try Again."
            }
        }else{
            console.log("Inside else");
                return {
                    updatedList:results
                }
            }
        
    });
}

module.exports = makeRequest