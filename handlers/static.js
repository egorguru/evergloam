const static = require('koa-static')

module.exports = process.env.NODE_ENV === 'production' ?
  static('client/build') : (ctx, next) => next()
