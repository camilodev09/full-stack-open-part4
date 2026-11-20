
const express = require('express')
const cors = require('cors')
require('./utils/db')
const morgan = require('morgan')
const Blog = require('./models/blog')
const blogsRouter = require('./routes/blogs')
const usersRouter = require('./routes/users')


const app = express()

// Global Middlewares
app.use(express.static('dist'))
app.use(cors())
app.use(express.json()) // Essential parser middleware to populate req.body

//custom morgan
morgan.token( 'body', (req)=>{
 return req.method === 'POST' ? JSON.stringify(req.body) : ''
})

app.use(morgan( ' :method :url :status :res[content-lenght] - :response-time ms :body ' ))

//Root Endpoint
app.get('/', (req,res)=>{
  res.send('<h1> BLOG LISTS </h1>')
})

//Info Endpoint


//Mount Modular Router Gateway
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

module.exports = app