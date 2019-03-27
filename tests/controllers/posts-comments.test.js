const helpers = require('../helpers')
const Post = require('../../models/Post')
const User = require('../../models/User')

describe('Posts Comments API', async () => {
  const testPost = {
    body: 'Test text'
  }
  const testComment = {
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
  describe('POST /posts/:postId/comments', () => {
    it('creates a comment', async () => {
      const post = await new Post(testPost).save()
      const res = await helpers.request.post(
        `posts/${post._id}/comments`,
        {
          json: true,
          body: testComment,
          headers: authHeader
        }
      )
      const comment = (await Post.findById(post._id)).comments[0]
      res.statusCode.should.eql(200)
      res.body.comments[0]._id.should.eql(comment._id.toString())
      res.body.comments[0].user._id.should.eql(comment.user._id.toString())
      res.body.comments[0].body.should.eql(comment.body)
    })
  })
  describe('GET /posts/:postId/comments', () => {
    it('gets post with comments', async () => {
      const post = await new Post(testPost).save()
      const resWithComments = await helpers.request.post(
        `posts/${post._id}/comments`,
        {
          json: true,
          body: testComment,
          headers: authHeader
        }
      )
      const comment = resWithComments.body.comments[0]
      const res = await helpers.request.get(`posts/${post._id}`, { json: true })
      res.statusCode.should.eql(200)
      res.body.comments[0]._id.should.eql(comment._id.toString())
      res.body.comments[0].user.should.eql(comment.user)
      res.body.comments[0].body.should.eql(comment.body)
    })
  })
  describe('DELETE /posts/:postId/comments/:commentId', () => {
    it('deletes the comment', async () => {
      const post = await new Post(testPost).save()
      await helpers.request.post(
        `posts/${post._id}/comments`,
        {
          json: true,
          body: testComment,
          headers: authHeader
        }
      )
      const commentId = (await Post.findOne()).comments[0]._id
      const res = await helpers.request.delete(`posts/${post._id}/comments/${commentId}`, {
        headers: authHeader
      })
      res.statusCode.should.eql(200)
      const updatedPost = await Post.findOne()
      updatedPost.comments.length.should.eql(0)
    })
  })
})
