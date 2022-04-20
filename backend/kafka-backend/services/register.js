const {createUser, validateUser} = require('../mongodb/mongoQueries/login');
const bcrypt = require('bcryptjs');
// const UserModel = require('../mongodb/models/User');
const {use} = require('bcrypt/promises');
const SALT_WORK_FACTOR = 10;

function registerUser(msg, callback) {
  console.log("In register user");
  const hashPass = async () => {
    console.log("Password before hash", msg.Password);
    try {
      const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
      let hashed = await bcrypt.hash(msg.Password, salt);
      console.log("hashed", hashed, msg.Password)
      return hashed;
    } catch (e) {
      return msg.Password;
    }
  }
  hashPass(msg.Password).then(hashPass => {
    createUser({...msg, Password: hashPass}).then(r => {
      callback(null, {message: "Created User"})
    }).catch(err => console.log("Err in hash pass", err));
  }).catch(err => console.log("In register user error", err))
}

function loginUser(msg, callback) {
  console.log("Inside login validate user backend", msg);
  validateUser(msg).then(async r => {
    if(r) {
    const validPassword = await bcrypt.compare(msg.Password, r.Password);
    console.log("Valida pass", validPassword)
    if(validPassword) callback(null, { message:"LoggedIn"})
    else callback(null, { message:"Invalid Creds"})
    }
    return callback(null, {message: "User doesnt exist"})
  }).catch(err => console.log("Err======", err));
}

module.exports = {registerUser, loginUser};


