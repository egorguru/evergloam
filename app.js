const Koa = require('koa')

const config = require('./lib/config')
const handlers = require('./handlers')

const app = new Koa()

handlers.forEach((h) => app.use(h))

module.exports = (callback) => {
  app.listen(config.port, callback)
  return app
}
