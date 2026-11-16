const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const totalLikes = require('../utils/list_helper').totalLikes
const favoriteBlog = require('../utils/list_helper.js').favoriteBlog
const mostBlogs = require('../utils/list_helper.js').mostBlogs
const mostLikes = require('../utils/list_helper.js').mostLikes


//4.3
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

//4.4
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },

    
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })


  
})

//4.5 exercise
describe('favoriteBlog', () => {
  const blogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      likes: 7,
    },
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12, // <--- Este es el ganador que tu test espera encontrar
    },
    {
      title: "First class tests",
      author: "Robert C. Martin",
      likes: 10,
    }
  ]

  test('finds the blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    
    // El objeto esperado contra el que comparas el resultado de tu función:
    const expected = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    }

    // Usamos deepStrictEqual para comparar propiedades de objetos en JavaScript
    assert.deepStrictEqual(result, expected)
  })
})

//4.6 exercise
describe('mostBlogs', () => {
  const blogs = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      likes: 10,
      url: 'http://example.com/1'
    },
    {
      title: 'TDD',
      author: 'Robert C. Martin',
      likes: 20,
      url: 'http://example.com/2'
    },
    {
      title: 'Refactoring',
      author: 'Martin Fowler',
      likes: 15,
      url: 'http://example.com/3'
    },
    {
      title: 'Design Patterns',
      author: 'Robert C. Martin',
      likes: 25,
      url: 'http://example.com/4'
    }
  ]

test('author with most blogs', () => {
  const result = listHelper.mostBlogs(blogs)

  const expected = {
    author: 'Robert C. Martin',
    blogs: 3
  }

  assert.deepStrictEqual(result, expected)
})
})

//4.7
describe('most likes', () => {
  const blogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Statement_Formally_Hoped.html',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD803.html',
      likes: 12,
      __v: 0
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://cleancoder.com/cta/blog/source/tile-winner/',
      likes: 10,
      __v: 0
    }
  ]

  test('author with most likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    assert.deepStrictEqual(result, expected)
  })
})



