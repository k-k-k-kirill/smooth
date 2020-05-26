import { CallbackVoid } from "objection"

const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
import User from '../../models/User'

const JWT_options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.LOGIN_SECRET
}

// Local strategy for initial login and token issue
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
  }, async (username: string, password: string, done: any) => {
    try {
        const user: User = await User.query().first().where('email', username)

        if(!user) { return done(null, false) }

        const passwordValid = await user.verifyPassword(password)

        if(passwordValid) {
            return done(null, user)
        } else {
            return done(null, false)
        }

    } catch(err) {
        return done(err, false)
    }
}))

// JWT Strategy for authenticating token-protected routes
passport.use(new JwtStrategy(JWT_options, async (decoded: any, done: any) => {
    try {
        const user: User = await User.query().findById(decoded.user)
        done(null, user)
    } catch(err) {
        console.log(err)
        done(err, false)
    }

}))


module.exports = passport