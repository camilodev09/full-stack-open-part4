const express = require('express')
const router = express.Router()
const blogController = require('../controllers/blogs')

router.get('/', blogController.getBlogs)
router.post('/', blogController.createBlog)
router.delete( '/:id', blogController.deleteBlog )   
router.put('/:id', blogController.updateBlog)

module.exports = router
