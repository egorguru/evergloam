const request = require('request-promise')

const config = require('../lib/config')

module.exports = {
  request: request.defaults({
    resolveWithFullResponse: true,
    simple: false,
    baseUrl: `http://localhost:${config.port}/api`
  })
}
