const helpers = require('../helpers')
const Subscription = require('../../models/Subscription')
const User = require('../../models/User')

describe('Subscriptions API', async () => {
  const testSubscription = {
    body: 'Test text'
  }
  let authHeader
  before(async () => {
    const testUser1 = {
      name: 'Subscriber',
      email: 'test@test.com',
      password: 'password'
    }
    const testUser2 = {
      name: 'Profile',
      email: 'test2@test.com',
      password: 'password'
    }
    await helpers.request.post('auth/register', {
      json: true,
      body: testUser1
    })
    await helpers.request.post('auth/register', {
      json: true,
      body: testUser2
    })
    const res = await helpers.request.post('auth/login', {
      json: true,
      body: testUser1
    })
    authHeader = {
      'Authorization': res.body.token
    }
    const user = await User.find()
    testSubscription.subscriber = user[0]._id
    testSubscription.profile = user[1]._id
  })
  beforeEach(async () => await Subscription.remove())
  describe('POST /subscriptions', () => {
    it('creates a subscription', async () => {
      const res = await helpers.request.post('subscriptions', {
        json: true,
        body: testSubscription,
        headers: authHeader
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.String()
      res.body.subscriber.should.eql(testSubscription.subscriber.toString())
      res.body.profile.should.eql(testSubscription.profile.toString())
      new Date(res.body.createdDate).should.be.a.Date()
    })
  })
  describe('GET /subscriptions', () => {
    it('gets all subscriptions', async () => {
      const subscription = await new Subscription(testSubscription).save()
      const res = await helpers.request.get('subscriptions', { json: true })
      res.statusCode.should.eql(200)
      res.body[0]._id.should.eql(subscription._id.toString())
      res.body[0].subscriber.should.eql(subscription.subscriber._id.toString())
      res.body[0].profile.should.eql(subscription.profile._id.toString())
      new Date(res.body[0].createdDate).should.eql(subscription.createdDate)
    })
    it('gets all subscriptions', async () => {
      const subscription = await new Subscription(testSubscription).save()
      const res = await helpers.request
        .get('subscriptions?profile=' + subscription.profile, { json: true })
      res.statusCode.should.eql(200)
      res.body[0]._id.should.eql(subscription._id.toString())
      res.body[0].subscriber.should.eql(subscription.subscriber._id.toString())
      res.body[0].profile.should.eql(subscription.profile._id.toString())
      new Date(res.body[0].createdDate).should.eql(subscription.createdDate)
    })
  })
  describe('DELETE /subscriptions', () => {
    it('deletes the subscription', async () => {
      const subscription = await new Subscription(testSubscription).save()
      const res = await helpers.request
        .delete('subscriptions/' + subscription._id.toString(), {
          headers: authHeader
        })
      res.statusCode.should.eql(200)
      const subscriptions = await Subscription.find()
      subscriptions.should.be.empty()
    })
  })
})
