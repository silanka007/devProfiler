const UsersRouter = () => {
    const router = require('express').Router();

    // @route   GET api/v1/users
    // @desc    test route
    // @access  Public
    router.get('/', (req, res) => {
        res.send('hello from users route...')
    })

    return router;
}

module.exports = UsersRouter;
