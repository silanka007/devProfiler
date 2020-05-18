const PostsRouter = () => {
    const router = require('express').Router();

    router.get('/', (req,res) => {
        res.send('hello from the posts route...')
    })

    return router;
}

module.exports = PostsRouter;
