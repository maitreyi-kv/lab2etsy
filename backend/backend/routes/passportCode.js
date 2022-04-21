const {SECRET_JWT_KEY} = require('../../kafka-backend/constants');
let JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const kafka = require('../kafka/client');
const { kafkaTopic } = require('../../constants');

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_JWT_KEY;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  console.log("JWTTT", jwt_payload);
  kafka.make_request(kafkaTopic.jwtUser , jwt_payload, function(err, user) {
    if (err){
      console.log("JWT", err);
      return done(err, false);
    }
    if(user) {
      console.log("JWT auth", user);
      return done(null, user);
    }
    else {
      console.log("JWT auth else");
      return done(null, false);
    }
  });
}));

exports.checkAuth = passport.authenticate('jwt', {session: false})
