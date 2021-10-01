const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')


const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)




beforeEach(async () => {
  //add user
  const saltRounds = 10
  await User.deleteMany({})
  const initialUser = helper.initialUser
  initialUser.passwordHash = await bcrypt.hash(initialUser.password, saltRounds)
  let userObject = new User(helper.initialUser)
  const user = await userObject.save()

  await Blog.deleteMany({})
  let blogObject = new Blog({ ...helper.initialBlogs[0], ...{ user :user._id } })
  await blogObject.save()
  blogObject = new Blog({ ...helper.initialBlogs[1], ...{ user :user._id } })
  await blogObject.save()
})

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id is used as unique identifier', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })


  test('default like zero', async () => {

    const response = await api.get('/api/blogs')
    const targets = response.body.filter(n => n.title === 'Missing Likes')
    targets.forEach(target => expect(target.likes).toEqual(0))
  })
})

describe('addition of a blog', () => {
  test('normal posting', async () => {
    const postObj =   {
      title: 'Test Post',
      author: 'demo001',
      url: 'https://demo001.com/',
      likes: 0
    }
    //get token first
    const userResponse = await api
      .post('/api/login')
      .send(helper.initialUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = userResponse.body.token
    //expect currect insert
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer '+ token)
      .send(postObj)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length+1)

    const titles = response.body.map(n => n.title)

    expect(titles).toContain(
      'Test Post'
    )
  })

  test('missing auth', async () => {
    const postObj =   {
      author: 'demo001',
      likes: 0
    }

    const userResponse = await api
      .post('/api/login')
      .send(helper.initialUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = userResponse.body.token

    await api.post('/api/blogs')
      .send(postObj)
      .set('Authorization', 'Bearer '+ token)
      .expect(400)

  }, 100000)


  test('missing requried fields', async () => {
    const postObj =   {
      title: 'Test Post',
      author: 'demo001',
      url: 'https://demo001.com/',
      likes: 0
    }

    await api.post('/api/blogs')
      .send(postObj)
      .expect(401)

  }, 100000)
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToDelete = blogsAtStart.body[0]

    const userResponse = await api
      .post('/api/login')
      .send(helper.initialUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const token = userResponse.body.token

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer '+ token)
      .expect(204)

    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.body.map(r => r.title)
    expect(contents).not.toContain(blogToDelete.title)

  })
})

describe('update of a blog', () => {
  test('normal update if id is valid', async () => {
    const users = await api.get('/api/users')
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updateObj = {
      id: blogToUpdate.id,
      title: 'Update Post',
      author: 'update',
      url: 'https://update.com/',
      likes: 10,
      user: users.body[0].id
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updateObj)

    const contents = response.body
    expect(contents).toEqual(updateObj)

  })
})

afterAll(() => {
  mongoose.connection.close()
})