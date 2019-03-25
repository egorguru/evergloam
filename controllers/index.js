const Router = require('koa-router')

const auth = require('./auth')
const users = require('./users')

const router = new Router().prefix('/api')

router.use(auth, users)

module.exports = router
