const {SECRET_JWT_KEY} = require('../../kafka-backend/constants');
let JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_JWT_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log("JWTTT", jwt_payload)
}));

