const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs
    .map(blog => blog.likes)
    .filter(like => like !== undefined)
    .reduce( (a,b) => a+b , 0)

  return sum
}


const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? undefined: blogs.reduce( (a,b) => a.likes> b.likes? a :b)
}

const mostBlogs = (blogs) => {
  if(blogs.length === 0)
    return undefined
  const result = _(blogs)
    .groupBy('author')
    .map(blog => {return { author: blog[0].author, blogs: blog.length }} )
    .maxBy('blogs')

  return result
}

const mostLikes = (blogs) => {
  if(blogs.length === 0)
    return undefined
  const result = _(blogs)
    .groupBy('author')
    .map(blog => {return { author: blog[0].author, likes: _.sumBy(blog, 'likes') }} )
    .maxBy('likes')

  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}