const router = require('express').Router();
const User = require('../../models/User');

const AuthRoute = () => {
    // @route   GET api/v1/auth
    // @desc    getting user data
    // @access  Public
    router.get('/', async(req, res) => {
        try{
            const user = await User.findById(req.user.id).select('-password');
            if(!user){
                return res.status(404).json({errors: [{ msg: "user not found!" }]})
            }
            res.send(user); 
        }catch(err){
            return res.status(404).json({errors: [{ msg: 'internal server error!'}]})
        }

    })

    return router;
}

module.exports = AuthRoute;
