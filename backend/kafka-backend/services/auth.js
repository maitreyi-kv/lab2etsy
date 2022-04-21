const {createUser, getUser} = require('../mongodb/mongoQueries/login');
const {hashPass, comparePass} = require('../mongodb/utils');

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
        const token = jwt.sign({message: "LoggedIn"}, "TOP_SECRET", )
        callback(null, {message: "LoggedIn"});
      }

    }
    return callback(null, {message: "User doesnt exist"})
  }).catch(err => console.log("Err in login user", err));
}

module.exports = {registerUser, loginUser};


