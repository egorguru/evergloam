const Router = require('koa-router')

const auth = require('./auth')

const router = new Router().prefix('/api')

router.use(auth)

module.exports = router
