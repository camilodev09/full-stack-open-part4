
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json and correct amount (Exercise 4.8)', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have a unique identifier named id instead of _id (Exercise 4.9)', async () => {
  const response = await api.get('/api/blogs')
  
  assert.strictEqual(response.body.length > 0, true)
  response.body.forEach(blog => {
    assert.strictEqual(Boolean(blog.id), true)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added (Exercise 4.10)', async () => {
  const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  
  // Verify total count incremented by 1
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  
  // Verify content persistence
  const titles = response.body.map(r => r.title)
  assert.strictEqual(titles.includes('Canonical string reduction'), true)
})

test('if likes property is missing, it defaults to 0 (Exercise 4.11)', async () => {
  const newBlogWithoutLikes = {
    title: 'Type systems are cool',
    author: 'Camilo Bautista',
    url: 'https://creazone.pe'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlogWithoutLikes)
    .expect(201)
    .expect('Content-Type', /application\/json/)

 
  assert.strictEqual(response.body.likes, 0)
})

test.only('backend responds with 400 Bad Request if title or url is missing (Exercise 4.12)', async () => {
  const newBlogWithoutTitle = {
    author: 'Camilo Bautista',
    url: 'https://creazone.pe'
  }

  const newBlogWithoutUrl = {
    title: 'Type systems are cool',
    author: 'Camilo Bautista'
  }

  // Test missing title
  await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

  // Test missing url
  await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)

  // Verify database size remains untouched (idempotency check)
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

// Delete  (Exercise 4.13)
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid (Exercise 4.13)', async () => {
    const notesAtStart = await api.get('/api/blogs')
    const blogToDelete = notesAtStart.body[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const notesAtEnd = await api.get('/api/blogs')
    
    // Verify collection 
    assert.strictEqual(notesAtEnd.body.length, initialBlogs.length - 1)

    // Verify content 
    const titles = notesAtEnd.body.map(r => r.title)
    assert.strictEqual(titles.includes(blogToDelete.title), false)
  })
})

// Update (Exercise 4.14)
describe('update of a blog', () => {
  test('succeeds with status code 200 and updates likes if id is valid (Exercise 4.14)', async () => {
    const blogsAtStart = await api.get('/api/blogs')
    const blogToUpdate = blogsAtStart.body[0]

    const updatedData = {
      likes: blogToUpdate.likes + 10
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // Verify that likes have been updated correctly
    assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)
  })
})

after(async () => {
  await mongoose.connection.close()
})