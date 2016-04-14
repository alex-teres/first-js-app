var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var user = require('../model/user');

var conf = require('../../config') ;
var opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
opts.secretOrKey = conf.jwtSecretKey;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        done(null, user);
    });
}));