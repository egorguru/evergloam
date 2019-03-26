const bodyParser = require('./body-parser')
const catchMongooseErrors = require('./catch-mongoose-errors')
const errors = require('./errors')
const passportInit = require('./passport-init')

module.exports = [
  bodyParser,
  catchMongooseErrors,
  errors,
  passportInit
]
