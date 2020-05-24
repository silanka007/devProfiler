const router = require('express').Router();
const { check } = require('express-validator');
const userController = require('../../controllers/usersController');



// @route   POST api/v1/users
// @desc    User registration
// @access  Public
router.post('/',[
    //validating user inputs
    check('name', 'name is required').not().isEmpty(),
    check('email', 'please provide a valid email address').isEmail(),
    check('password', 'password must be greater than 6 characters').isLength({ min: 6})

], userController.createUser)

module.exports = router;
