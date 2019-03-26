const Router = require('koa-router')
const passport = require('koa-passport')

const Post = require('../models/Post')

const router = new Router().prefix('/posts/:postId/comments')

router.post('/', passport.authenticate('jwt', { session: false }), async (ctx) => {
  const post = await Post.findById(ctx.params.postId)
  if (!post) {
    ctx.throw(404, 'Post has not been found')
  }
  const { body } = ctx.request.body
  post.comments.unshift({ body, user: ctx.state.user._id })
  ctx.body = await post.save()
})

router.delete('/:commentId', passport.authenticate('jwt', {
  session: false
}), async (ctx) => {
  const post = await Post.findById(ctx.params.postId)
  if (!post) {
    ctx.throw(404, 'Post has not been found')
  }
  const commentIndex = post.comments
    .findIndex((c) => c._id.toString() === ctx.params.commentId)
  if (commentIndex < 0) {
    ctx.throw(404, 'Comment has not been found')
  }
  post.comments.splice(commentIndex, 1)
  ctx.body = await post.save()
})

module.exports = router.routes()
