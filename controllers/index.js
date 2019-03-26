const Router = require('koa-router')

const auth = require('./auth')
const posts = require('./posts')
const users = require('./users')

const router = new Router().prefix('/api')

router.use(auth, posts, users)

module.exports = router
