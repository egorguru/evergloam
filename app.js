const Koa = require('koa')

const config = require('./lib/config')
const handlers = require('./handlers')
const mongooseConfig = require('./lib/mongoose-config')

const app = new Koa()

handlers.forEach((h) => app.use(h))

module.exports = (callback) => {
  mongooseConfig()
  app.listen(config.port, callback)
  return app
}
