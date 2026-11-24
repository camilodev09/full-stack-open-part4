const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const config = require('../utils/config')



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

    // Resuelto previamente por userExtractor
    const user = req.user

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
    const blog = await Blog.findById(req.params.id)
    if (!blog) {
      return res.status(404).end()
    }

    // Solo el creador del blog puede eliminarlo
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'only the creator can delete a blog' })
    }

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