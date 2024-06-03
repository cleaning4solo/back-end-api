const express = require('express');

const router = express.Router();
const {
  getAllBlogs,
  createBlog,
  getSpecifiedBlog,
  updateBlogById,
  deleteBlogById,
} = require('../controllers/blogController');

router.route('/').get(getAllBlogs);
router.route('/').post(createBlog);
router.route('/:id').get(getSpecifiedBlog);
router.route('/:id').put(updateBlogById);
router.route('/:id').delete(deleteBlogById);

module.exports = router;
