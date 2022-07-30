const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body
  if (body.title === undefined) {
    return response.status(400).json({ error: 'title missing' })
  }
  if (body.url === undefined) {
    return response.status(400).json({ error: 'url missing' })
  }

  const user = request.user

  const blog = new Blog(
    {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    }
  )
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', middleware.userExtractor, async(request, response,next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === user._id.toString()){
    //delete
    try{
      await Blog.findByIdAndDelete(request.params.id)
      user.blogs = user.blogs.filter((ele) => ele.toString() !== user._id.toString())
      await user.save()
      return response.status(204).end()
    }catch(e){
      next(e)
    }
  }
  //not match
  response.status(401).json({ error: 'You are not the creater of this blog' })

})

blogsRouter.put('/:id', middleware.userExtractor,  async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    .then(updatedBlog => {
      response.json(updatedBlog)
    })
    .catch(error => next(error))

})
module.exports = blogsRouter