const helpers = require('../helpers')
const Post = require('../../models/Post')
const User = require('../../models/User')

describe('Posts Likes API', async () => {
  const testPost = {
    body: 'Test text'
  }
  let authHeader
  before(async () => {
    const testUser = {
      name: 'Test Test',
      email: 'test@test.com',
      password: 'password'
    }
    await helpers.request.post('auth/register', {
      json: true,
      body: testUser
    })
    const res = await helpers.request.post('auth/login', {
      json: true,
      body: testUser
    })
    authHeader = {
      'Authorization': res.body.token
    }
    const user = await User.findOne()
    testPost.user = user._id
  })
  beforeEach(async () => await Post.remove())
  describe('POST /posts/:postId/likes', () => {
    it('creates a like', async () => {
      const post = await new Post(testPost).save()
      const res = await helpers.request.post(
        `posts/${post._id}/likes`,
        {
          json: true,
          body: {},
          headers: authHeader
        }
      )
      res.statusCode.should.eql(200)
      res.body.likes[0]._id.should.be.a.String()
      res.body.likes[0].user.should.eql(testPost.user.toString())
      new Date(res.body.likes[0].createdDate).should.be.a.Date()
    })
    it('creates a two likes with one user', async () => {
      const post = await new Post(testPost).save()
      await helpers.request.post(
        `posts/${post._id}/likes`,
        {
          json: true,
          body: {},
          headers: authHeader
        }
      )
      const res = await helpers.request.post(
        `posts/${post._id}/likes`,
        {
          json: true,
          body: {},
          headers: authHeader
        }
      )
      res.statusCode.should.eql(400)
      res.body.error.should.eql('User already liked this post')
    })
  })
  describe('GET /posts/:postId/likes', () => {
    it('gets post with likes', async () => {
      const post = await new Post(testPost).save()
      const resWithLikes = await helpers.request.post(
        `posts/${post._id}/likes`,
        {
          json: true,
          body: {},
          headers: authHeader
        }
      )
      const like = resWithLikes.body.likes[0]
      const res = await helpers.request.get(`posts/${post._id}`, { json: true })
      res.statusCode.should.eql(200)
      res.body.likes[0]._id.should.eql(like._id.toString())
      res.body.likes[0].user.should.eql(like.user.toString())
    })
  })
  describe('DELETE /posts/:postId/comments/:likeId', () => {
    it('deletes the like', async () => {
      const post = await new Post(testPost).save()
      await helpers.request.post(
        `posts/${post._id}/likes`,
        {
          json: true,
          body: {},
          headers: authHeader
        }
      )
      const likeId = (await Post.findOne()).likes[0]._id
      const res = await helpers.request.delete(`posts/${post._id}/likes/${likeId}`, {
        headers: authHeader
      })
      res.statusCode.should.eql(200)
      const updatedPost = await Post.findOne()
      updatedPost.likes.length.should.eql(0)
    })
  })
})
