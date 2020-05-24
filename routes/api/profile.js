const router = require('express').Router();
const { check } = require('express-validator');

const profileController = require('../../controllers/profileController');

// @route   GET api/v1/profile
// @desc    Test route
// @access  Private
router.get('/', profileController.getProfile);


// @route   POST api/v1/profile
// @desc    creating and updating user profile
// @access  Private
router.post('/', [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skill(s) is/are required').not().isEmpty()
], profileController.postProfile)


module.exports = router;
