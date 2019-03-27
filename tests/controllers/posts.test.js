const helpers = require('../helpers')
const Post = require('../../models/Post')
const User = require('../../models/User')

describe('Posts API', async () => {
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
  describe('POST /posts', () => {
    it('creates a post', async () => {
      const res = await helpers.request.post('posts', {
        json: true,
        body: testPost,
        headers: authHeader
      })
      res.statusCode.should.eql(201)
      res.body._id.should.be.a.String()
      res.body.body.should.eql(testPost.body)
      res.body.user._id.should.eql(testPost.user.toString())
      new Date(res.body.createdDate).should.be.a.Date()
    })
    it('creates an invalid post', async () => {
      const res = await helpers.request.post('posts', {
        json: true,
        body: { body: '' },
        headers: authHeader
      })
      res.statusCode.should.eql(400)
      res.body.error.should.eql('Bad credentials')
    })
  })
  describe('GET /posts', () => {
    it('gets all posts', async () => {
      const post = await new Post(testPost).save()
      const res = await helpers.request.get('posts?skip=0&limit=1', { json: true })
      res.statusCode.should.eql(200)
      res.body[0]._id.should.eql(post._id.toString())
      res.body[0].body.should.eql(post.body)
      res.body[0].user._id.should.eql(post.user._id.toString())
      new Date(res.body[0].createdDate).should.eql(post.createdDate)
    })
    it('gets all posts by user', async () => {
      const post = await new Post(testPost).save()
      const res = await helpers.request.get(
        'posts?skip=0&limit=1&user=' + post.user._id.toString(),
        { json: true }
      )
      res.statusCode.should.eql(200)
      res.body[0]._id.should.eql(post._id.toString())
      res.body[0].body.should.eql(post.body)
      res.body[0].user._id.should.eql(post.user._id.toString())
      new Date(res.body[0].createdDate).should.eql(post.createdDate)
    })
    it('gets all posts by no existed user', async () => {
      await new Post(testPost).save()
      const res = await helpers.request
        .get('posts?skip=0&limit=1&user=noop', { json: true })
      res.statusCode.should.eql(400)
      res.body.error.should.eql('Bad credentials')
    })
  })
  describe('GET /posts (by users)', () => {
    it('gets posts by users', async () => {
      const newUser = {
        name: 'Test2 Test2',
        email: 'test2@test.com',
        password: 'password'
      }
      await helpers.request.post('auth/register', {
        json: true,
        body: newUser
      })
      const user2 = await User.findOne({ email: newUser.email })
      const post1 = await new Post(testPost).save()
      const post2 = await new Post({
        body: 'Test2 text2',
        user: user2._id
      }).save()
      const res = await helpers.request.get(
        `posts?skip=0&limit=2&users=${post1.user._id},${post2.user._id}`,
        { json: true }
      )
      res.body[0]._id.should.eql(post2._id.toString())
      res.body[1]._id.should.eql(post1._id.toString())
    })
  })
  describe('GET /posts/:id', () => {
    it('gets the post by id', async () => {
      const post = await new Post(testPost).save()
      const res = await helpers.request
        .get('posts/' + post._id.toString(), { json: true })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(post._id.toString())
      res.body.body.should.eql(post.body)
      res.body.user._id.should.eql(post.user._id.toString())
      new Date(res.body.createdDate).should.eql(post.createdDate)
    })
    it('gets the post by no existed id', async () => {
      const res = await helpers.request
        .get('posts/5c83ed13faa2ea92348d8be4', { json: true })
      res.statusCode.should.eql(404)
    })
  })
  describe('PUT /posts', () => {
    it('updates the post', async () => {
      const post = await new Post(testPost).save()
      post.body = 'Edited body'
      const res = await helpers.request.put('posts', {
        json: true,
        body: post,
        headers: authHeader
      })
      res.statusCode.should.eql(200)
      res.body._id.should.eql(post._id.toString())
      res.body.body.should.eql(post.body)
      res.body.user._id.should.eql(post.user._id.toString())
      new Date(res.body.createdDate).should.eql(post.createdDate)
    })
  })
  describe('DELETE /posts', () => {
    it('deletes the post', async () => {
      const post = await new Post(testPost).save()
      const res = await helpers.request.delete('posts/' + post._id.toString(), {
        headers: authHeader
      })
      res.statusCode.should.eql(200)
      const posts = await Post.find()
      posts.should.be.empty()
    })
  })
})
