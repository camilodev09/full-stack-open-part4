const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')

//1. getTokenFrom(req) lee el header Authorization
if (!req.token) {
  return res.status(401).json({ error: 'token invalid' })
}

// Get Blogs
const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    })
    res.json(blogs)
  } catch (error) {
    next(error)
  }
}

// Post Blogs
const createBlog = async (req, res, next) => {
  try {
    const body = req.body

    // Exercise 4.12
    if (!body.title || !body.url) {
      return res.status(400).json({ error: 'title or url missing' })
    }

    // Exercise 4.18 & 4.19: Verify JWT and resolve authenticated user
    const token = getTokenFrom(req)
    if (!token) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const decodedToken = jwt.verify(req.token, config.SECRET)
    if (!decodedToken.id) {
      return res.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    if (!user) {
      return res.status(401).json({ error: 'user not found' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id,
      likes: body.likes === undefined ? 0 : body.likes,
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
}

// Delete (Exercise 4.13)
const deleteBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (error) {
    next(error)
  }
}

// Update (Exercise 4.14)
const updateBlog = async (req, res, next) => {
  try {
    const { title, author, url, likes } = req.body

    const blogData = {
      title,
      author,
      url,
      likes,
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      blogData,
      { returnDocument: 'after', runValidators: true, context: 'query' }
    )

    if (updatedBlog) {
      res.json(updatedBlog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBlogs,
  createBlog,
  deleteBlog,
  updateBlog,
}