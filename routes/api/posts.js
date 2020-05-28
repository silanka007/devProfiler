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


// @route   GET /api/v1/posts
// @desc    get all posts
// @access  private
router.get('/', authMiddleware, postController.getPosts);


// @route   GET /api/v1/posts/:id
// @desc    get post by id
// @access  private
router.get('/:id', authMiddleware, postController.getPost);


// @route   DELETE /api/v1/:id
// @desc    deleting own post
// @param   private
router.delete('/:id', authMiddleware, postController.deletePost);

module.exports = router;
