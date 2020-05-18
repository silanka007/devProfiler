const AuthRoute = () => {
    const router = require('express').Router();

    // @route   GET api/v1/auth
    // @desc    Test route
    // @access  Public
    router.get('/', (req, res) => {
        res.send('hello from the auth route...')
    })

    return router;
}

module.exports = AuthRoute;
