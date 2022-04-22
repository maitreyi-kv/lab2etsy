const jwt_decode = require('jwt-decode');

function decodedJWT(jwtToken) {
  return jwtToken ? jwt_decode(jwtToken).split(" ")[1]: null;
}

module.exports = decodedJWT
