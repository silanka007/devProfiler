const router = require('express').Router();
const { check } = require('express-validator');
const authMiddleware = require('../../middlewares/authMiddleware');

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


// @route   PUT api/v1/profile/experience
// @desc    add experience to user profile
// @access  private
router.put('/experience', [authMiddleware, [
    check('title', 'title is required').not().isEmpty(),
    check('location', 'location is required').not().isEmpty(),
    check('company', 'company is required').not().isEmpty(),
    check('from', 'from is required').not().isEmpty(),
    check('current', 'current is required').not().isEmpty()
]], profileController.addExperience);

// @route   DELETE api/v1/profile/experience/exp_id
// @desc    delete experience
// @access  private
router.delete('/experience/:exp_id', authMiddleware, profileController.deleteExperience);

module.exports = router;
