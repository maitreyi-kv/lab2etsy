const {createUser, getUser} = require('../mongodb/mongoQueries/login');
const {hashPass, comparePass} = require('../mongodb/utils');
const jwt = require('jsonwebtoken');
const {SECRET_JWT_KEY} = require('../constants');

function registerUser(msg, callback) {
  console.log("In register user");
  getUser(msg).then(async userExists => {
    if (!userExists) {
      let hashPassword = await hashPass(msg.Password)
      let userCreation = await createUser({...msg, Password: hashPassword})
      if(userCreation)
          callback(null, {message: "Created User"})
    } else {
      callback(null, {message: "User already exists"})
    }
  }).catch(err => console.log("Error while fetching user register", err))
}

function loginUser(msg, callback) {
  console.log("Inside login validate user backend", msg);
  getUser(msg).then(async userExists => {
    if (userExists) {
      const validPassword = await comparePass(msg.Password, userExists.Password)
      if (!validPassword) callback(null, {message: "Invalid Creds"})
      else {
        const payloadObj = {
          Email: userExists.Email,
          id: userExists._id
        };
        const token = jwt.sign(payloadObj, SECRET_JWT_KEY, { expiresIn: "1d"});
        callback(null, { message: "Logged In Successfully", token: "Bearer "+token });
      }
    }
    return callback(null, {message: "User doesnt exist"})
  }).catch(err => console.log("Err in login user", err));
}

function checkJWT(msg, callback) {
  console.log("Inside jwtUser validate user backend", msg);
  getUser(msg).then(async userExists => {
    if (userExists) callback(null, userExists);
    callback(null, {});
  }).catch(err => console.log("ERR", err));

}

module.exports = {registerUser, loginUser, checkJWT};


