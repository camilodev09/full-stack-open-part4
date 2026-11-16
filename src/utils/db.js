const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

logger.info('Connecting to MongoDB...')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB Atlas successfully')
  })
  .catch((error) => {
    logger.error('Error connecting to MongoDB:', error.message)
  })

  module.exports = mongoose