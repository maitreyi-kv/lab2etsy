const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;

const hashPass = async (password) => {
  console.log("Password before hash", password);
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    let hashed = await bcrypt.hash(password, salt);
    console.log("hashed", hashed, password)
    return hashed;
  } catch (e) {
    return password;
  }
}

const comparePass = async (pass, hashedPass) => {
  return bcrypt.compare(pass, hashedPass);
}

module.exports = { hashPass, comparePass }
