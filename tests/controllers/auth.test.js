const helpers = require('../helpers')
const User = require('../../models/User')

describe('User Auth API', async () => {
  const testUser = {
    name: 'Test Test',
    email: 'test@test.com',
    password: 'password'
  }
  beforeEach(async () => await User.remove())
  describe('POST /auth/register', () => {
    it('registers user', async () => {
      const res = await helpers.request.post('auth/register', {
        json: true,
        body: testUser
      })
      res.statusCode.should.eql(201)
      const createdUser = await User.findOne({ email: testUser.email })
      createdUser.name.should.eql(testUser.name)
      createdUser.email.should.eql(testUser.email)
      createdUser.password.should.be.a.String()
      createdUser.createdDate.should.be.a.Date()
    })
    it('registers one user twice', async () => {
      await helpers.request.post('auth/register', {
        json: true,
        body: testUser
      })
      const res = await helpers.request.post('auth/register', {
        json: true,
        body: testUser
      })
      res.statusCode.should.eql(400)
      res.body.error.should.eql('Email already exists')
    })
  })
  describe('POST /auth/login', () => {
    it('logs in user', async () => {
      await helpers.request.post('auth/register', {
        json: true,
        body: testUser
      })
      const res = await helpers.request.post('auth/login', {
        json: true,
        body: testUser
      })
      res.statusCode.should.eql(200)
      res.body.token.should.containEql('Bearer ')
    })
    it('logs in with nonexistent user', async () => {
      const res = await helpers.request.post('auth/login', {
        json: true,
        body: {
          email: 'nonexistent@test.com',
          password: 'password'
        }
      })
      res.statusCode.should.eql(400)
      res.body.error.should.eql('User with this email does not exist')
    })
    it('logs in with incorrect password', async () => {
      await helpers.request.post('auth/register', {
        json: true,
        body: testUser
      })
      const res = await helpers.request.post('auth/login', {
        json: true,
        body: {
          email: testUser.email,
          password: 'wrongpassword'
        }
      })
      res.statusCode.should.eql(400)
      res.body.error.should.eql('Password incorrect')
    })
  })
})
