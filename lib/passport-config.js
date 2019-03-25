const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const config = require('./config')
const User = require('../models/User')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

module.exports = (passport) => {
  passport.use(new JwtStrategy(opts, async (payload, done) => {
    const user = await User.findById(payload.id)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  }))
}
