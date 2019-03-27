const helpers = require('../helpers')
const User = require('../../models/User')

describe('Users API', async () => {
  const testUser = {
    name: 'Test Test',
    email: 'test@test.com',
    password: 'password'
  }
  beforeEach(async () => await User.remove())
  describe('GET /users/:id', () => {
    it('gets the user by id', async () => {
      const user = await new User(testUser).save()
      const res = await helpers.request
        .get('users/' + user._id.toString(), { json: true })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(user._id.toString())
      res.body.name.should.eql(user.name)
      res.body.email.should.eql(user.email)
      should.not.exist(res.body.password)
      new Date(res.body.createdDate).should.eql(user.createdDate)
    })
    it('gets the user by no existed id', async () => {
      const res = await helpers.request
        .get('users/5c83ed13faa2ea92348d8be4', { json: true })
      res.statusCode.should.eql(404)
    })
  })
})
