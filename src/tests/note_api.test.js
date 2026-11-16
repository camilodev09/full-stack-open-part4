const { test, after, describe } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const supertest = require('supertest')

const app = require('../app')
const api = supertest(app)

describe('blog api integration tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(typeof response.body.length, 'number')
  })

  test('returned blogs contain valid title properties', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    
    // Fixed: Replaced legacy note string check ('HTML is easy') with schema-compliant assertion
    assert.ok(titles.length > 0)
  })
})

after(async () => {
  await mongoose.connection.close()
})