const User = require('../models/user')
const Blog = require('../models/blog')
// ...

const initialUser = {
  username: 'test',
  name: 'test',
  password: 'abc123'
}

const initialBlogs = [
  {
    title: 'Missing Likes',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  },

  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs,
  initialUser,
  blogsInDb,
  usersInDb,
}