const UsersRouter = () => {
    const router = require('express').Router();
    const { check, validationResult } = require('express-validator');
    const User = require('../../models/User');
    const gravatar = require('gravatar');
    const bcrypt = require('bcryptjs');
    const config = require('config');
    const jwt = require('jsonwebtoken');

    // @route   POST api/v1/users
    // @desc    User registration
    // @access  Public
    router.post('/',[
        //validating user inputs
        check('name', 'name is required').not().isEmpty(),
        check('email', 'please provide a valid email address').isEmail(),
        check('password', 'password must be greater than 6 characters').isLength({ min: 3})

    ], async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()  })
        }
        const { name, email, password } = req.body;

        try{
            let user = await User.findOne({email})
            if(user){
                return res.status(400).json({errors: [{msg: "Email already in use"}]})
            }
            const avatar = gravatar.url(email, {
                s: "200",
                r: "pg",
                d: "mm"
            });

            user = new User({name, email, password, avatar});

            //hashing password
            const salt = await bcrypt.genSalt(12)
            user.password = await bcrypt.hash(password, salt);

            //saving user to db
            user.save();

            //generating user token
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if(err) throw err;
                res.json({ token });
            })

        }catch(err){
            res.status(500).json({errors: [{msg: "internal server error"}]});
        }

    })
    
    return router;
}

module.exports = UsersRouter;
