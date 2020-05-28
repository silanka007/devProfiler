const { validationResult } = require('express-validator');
const debug = require('debug')('app:post')

const Post = require('../models/Post');
const User = require('../models/User');


// create a new post
exports.createPost = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = new Post({
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        })
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        debug(err);
        return res.status(500).send("internal server error")
    }
}


// get all posts
exports.getPosts = async(req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.send(posts);
    } catch (err) {
        debug(err);
        res.status(500).send('internal server error')
    }
}


// get a single post by id
exports.getPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ errors: [{ msg: 'post not found' }]})
        }
        res.json(post)
    } catch (err) {
        debug(err);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ errors: [{ msg: 'post not found' }]})
        }
        return res.status(500).send('internal server error')
    }
}


// delete own post
exports.deletePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ errors: [{ msg: 'post not found'}]})
        }
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ errors: [{ msg: 'you are not authorized to delete this post'}]})
        }
        await post.remove();
        res.json({ msg: 'post deleted successfully!'})
    } catch (err) {
        debug(err);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ errors: [{ msg: 'post not found'}]})
        }
        return res.status(500).send('internal server error')
    }
}


//liking a post
exports.likePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ errors: [{ msg: 'post not found'}]})
        }
        //checking if user already liked the post
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ errors: [{ msg: 'post already liked'}]})
        }
        post.likes.unshift({ user: req.user.id });
        //saving to db
        await post.save();
        res.send(post);
    } catch (err) {
        debug(err);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ errors: [{ msg: 'post not found'}]})
        }
        return res.status(500).send('internal server error');
    }
}


//unlike post
exports.unlikePost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ errors: [{ msg: 'post not found'}]})
        }
        // checking if user has not liked the post
        if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ errors: [{ msg: 'post need to be liked first'}]});
        }
        //getting the index of the user in the likes array and splicing it  from the array
        const removeIndex = post.likes.map(like => like.user).indexOf(req.user.id);
        post.likes.splice(removeIndex, 1);
        await post.save()
        res.send(post);
    } catch (err) {
        debug(err);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ errors: [{ msg: 'post not found'}]})
        }
        return res.status(500).send('internal server error');
    }
}
