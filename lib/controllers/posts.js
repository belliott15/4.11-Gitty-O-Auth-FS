const { Router } = require('express');
const Post = require('../models/Post');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/', authenticate, async (req, res) => {
    const allPosts = await Post.getAll();
    res.json(allPosts);
  })
  .post('/', authenticate, async (req, res, next) => {
    try{
      const newPost = await Post.insert(res.body);
      res.json(newPost);
    }catch(e){
      next(e);
    }
  })
;
