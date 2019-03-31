const Router = require('koa-router')
const passport = require('koa-passport')

const Subscription = require('../models/Subscription')

const router = new Router().prefix('/subscriptions')

router.post('/', passport.authenticate('jwt', {
  session: false
}), async (ctx) => {
  const { profile } = ctx.request.body
  const subscriber = ctx.state.user._id
  const checkSubscription = await Subscription.findOne({ subscriber, profile })
  if (checkSubscription) {
    ctx.throw(400, 'You have alredy subscribed')
  }
  ctx.body = await new Subscription({ subscriber, profile }).save()
  ctx.status = 201
})

router.get('/', async (ctx) => {
  ctx.body = await Subscription.find(ctx.query)
})

router.delete('/:_id', passport.authenticate('jwt', {
  session: false
}), async (ctx) => {
  await Subscription.findOneAndDelete({
    _id: ctx.params._id,
    subscriber: ctx.state.user._id
  })
  ctx.body = { message: 'You was unsubscribed' }
})

module.exports = router.routes()