const { Strategy, ExtractJwt }  = require('passport-jwt')

const config = require('./config')
const User = require('../models/User')

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

module.exports = (passport) => {
  passport.use(new Strategy(opts, async (payload, done) => {
    const user = await User.findById(payload.id)
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  }))
}
