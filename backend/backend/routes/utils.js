const jwt_decode = require('jwt-decode');

function decodedJWT(jwtToken) {
  return jwtToken ? jwt_decode(jwtToken): null;
}

module.exports = decodedJWT
