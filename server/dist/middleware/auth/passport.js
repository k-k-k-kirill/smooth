"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User_1 = __importDefault(require("../../models/User"));
const JWT_options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.LOGIN_SECRET
};
// Local strategy for initial login and token issue
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
    try {
        const user = await User_1.default.query().first().where('email', username);
        if (!user) {
            return done(null, false);
        }
        const passwordValid = await user.verifyPassword(password);
        if (passwordValid) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (err) {
        return done(err, false);
    }
}));
// JWT Strategy for authenticating token-protected routes
passport.use(new JwtStrategy(JWT_options, async (decoded, done) => {
    try {
        const user = await User_1.default.query().findById(decoded.user);
        done(null, user);
    }
    catch (err) {
        console.log(err);
        done(err, false);
    }
}));
module.exports = passport;
