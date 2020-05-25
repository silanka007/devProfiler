const router = require('express').Router();

router.get('/', (req,res) => {
    res.send('hello from the posts route...')
})


module.exports = router;
