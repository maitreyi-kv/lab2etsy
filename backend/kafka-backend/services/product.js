const {createProducts} = require('../mongodb/connection');

function handle_request(msg, callback) {

    console.log("Inside book kafka backend", msg);
    createProducts(msg).then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
};

exports.handle_request = handle_request;


