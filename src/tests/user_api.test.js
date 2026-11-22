const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

describe('POST /api/users validation', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('fails with status code 400 if password is shorter than 3 chars', async () => {
    const usersAtStart = await User.find({})

    const newUser = {
      username: 'validuser',
      name: 'Camilo',
      password: '12',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.ok(result.body.error)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  after(async () => {
    await mongoose.connection.close()
  })
})