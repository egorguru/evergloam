const passport = require('koa-passport')
const passportConfig = require('../lib/passport-config')

passportConfig(passport)

module.exports = passport.initialize()
