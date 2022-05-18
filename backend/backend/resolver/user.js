const UserModel = require('../models/User');
const {createUser} = require('../mongoQueries/login');
const {hashPass} = require('../../kafka-backend/mongodb/utils');

const registerUserResolver = async ({Name, Password, Email}) => {
  console.log("comign here!!", Name, Password, Email)
  let userExists = await UserModel.findOne({Email});
  if (!userExists) {
    console.log("User ecirts", userExists)
    let hashPassword = await hashPass(Password)
    let userCreation = await createUser({Name, Email, Password: hashPassword})
    if (userCreation) {
      console.log("User created!!")
      return "Created User"
    } else {
      return "Created User Failed"
    }
  } else {
    console.log("User exits", userExists)
    return "Email already registered"
  }
}


const updateProfileResolver = async ({Name, Phone, City, Country, Address, ImageURL, UserID}) => {
  return UserModel.findByIdAndUpdate(UserID, {
    Name,
    Phone,
    City,
    Country,
    Address,
    ImageURL
  }, {safe: true, upsert: true});
}

module.exports = { registerUserResolver, updateProfileResolver }
