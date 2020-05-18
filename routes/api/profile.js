const ProfileRouter = () => {
    const router = require('express').Router();

    // @route   GET api/v1/profile
    // @desc    Test route
    // @access  Public
    router.get('/', (req, res) => {
        res.send('hello from the profile route');
    })

    return router;
}

module.exports = ProfileRouter;
