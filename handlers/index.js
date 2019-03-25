const bodyParser = require('./body-parser')
const errors = require('./errors')
const passportInit = require('./passport-init')

module.exports = [
  bodyParser,
  errors,
  passportInit
]
