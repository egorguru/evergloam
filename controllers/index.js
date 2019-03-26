const Router = require('koa-router')

const auth = require('./auth')
const postsComments = require('./posts-comments')
const posts = require('./posts')
const users = require('./users')

const router = new Router().prefix('/api')

router.use(auth, postsComments, posts, users)

module.exports = router
