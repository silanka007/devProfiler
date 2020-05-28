const router = require('express').Router();
const { check } = require('express-validator');

const authMiddleware = require('../../middlewares/authMiddleware');
const postController = require('../../controllers/postController');

// @route   POST /api/v1/posts
// @desc    add new post
// @access  private
router.post('/', [authMiddleware, [
    check('text', 'text is required').not().isEmpty()
]], postController.createPost)

module.exports = router;
