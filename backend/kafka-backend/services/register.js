const {createUser} = require('../mongodb/mongoQueries/login');

function registerUser(msg, callback) {
    console.log("Inside registerUser backend", msg);
    createUser(msg).then(r => {
        callback(null, r)
    }).catch(err => console.log("Err======", err));
};

module.exports = { registerUser };


