const router = require('express').Router();
const { check } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware');

const profileController = require('../../controllers/profileController');

// @route   GET api/v1/profile/me
// @desc    Test route
// @access  Private
router.get('/me', authMiddleware, profileController.getProfile);


// @route   POST api/v1/profile
// @desc    creating and updating user profile
// @access  Private
router.post('/', [authMiddleware, [
    check('status', 'status is required').not().isEmpty(),
    check('skills', 'skill(s) is/are required').not().isEmpty()
]], profileController.postProfile)


// @route   GET api/v1/profiles
// @desc    get all profiles
// @access  Public
router.get('/', profileController.getProfiles);


// @route   GET api/v1/profile/user/:user_id
// @desc    get profile by user id
// @access  Public
router.get('/user/:user_id', profileController.getProfileByUserId);

// @route   DELETE api/v1/profile
// @desc    delete profile, user and post
// @access  Private
router.delete('/', authMiddleware, profileController.deleteUserInfo);


module.exports = router;
