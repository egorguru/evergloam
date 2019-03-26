const Router = require('koa-router')

const auth = require('./auth')
const postsComments = require('./posts-comments')
const postsLikes = require('./posts-likes')
const posts = require('./posts')
const subscriptions = require('./subscriptions')
const users = require('./users')

const router = new Router().prefix('/api')

router.use(auth, postsComments, postsLikes, posts, subscriptions, users)

module.exports = router
