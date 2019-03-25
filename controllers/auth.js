const Router = require('koa-router')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const config = require('../lib/config')

const router = new Router().prefix('/auth')

router.post('/register', async (ctx) => {
  const { name, email, password } = ctx.request.body
  const user = await User.findOne({ email })
  if (user) {
    ctx.throw(400, 'Email already exists')
  }
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  await new User({ email, name, password: hash }).save()
  ctx.status = 201
})

router.post('/login', async (ctx) => {
  const { email, password } = ctx.request.body
  const user = await User.findOne({ email })
  if (!user) {
    ctx.throw(400, 'User with this email does not exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (isMatch) {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email
    }
    const token = jwt.sign(payload, config.secret, { expiresIn: 3600 * 24 })
    ctx.body = { token: `Bearer ${token}` }
  } else {
    ctx.throw(400, 'Password incorrect')
  }
})

module.exports = router.routes()
