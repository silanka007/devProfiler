const router = require('express').Router();
const { check } = require('express-validator');

const authMiddleware =  require('../../middlewares/authMiddleware');
const authController = require('../../controllers/authController');


// @route   GET api/v1/auth
// @desc    getting user data
// @access  Private
router.get('/', authMiddleware, authController.getUser);

// @route   POST /api/v1/auth
// @desc    authentication of user login
// @access  private
router.post('/', [
    check('email', 'please provide a valid email address').isEmail(),
    check('password', 'Password must not be less than 6 characters').isLength({ min: 6})
], authController.login);


module.exports = router;
