const router = require('express').Router();
const mongoose = require('mongoose');
const auth = require('../middleware/auth');
const { getKeyword } = require('../../utils/utils');

const Post = require('../models/Post');

// Global Variables
const _id = new mongoose.Types.ObjectId();

/* 
** @route   GET /
** @desc    Get all posts 
^^ @access  Public
*/ 
router.get('/', (req, res) => {
  Post.find()
    .then(posts => res.status(200).json({ posts }))
    .catch(err => res.status(500).json({ error: err }))
});

/* 
** @route   POST /new
** @desc    Create new post
^^ @access  Private
*/ 
router.post('/new', auth, (req, res) => {
  const { name, description, productPic } = req.body;

  const newPost = new Post({
    _id,
    name,
    description,
    productPic,
    keyword: getKeyword(name),
    createdAt: new Date().toISOString(),
    createdBy: req.user
  });

  newPost
    .save()
    .then(post => res.status(201).json({ post }))
    .catch(err => res.status(500).json({ error: err }))
});

/* 
** @route   GET /myposts
** @desc    Get all posts specific to a user
^^ @access  Private
*/ 
router.get('/myposts', auth, (req, res) => {
  Post.find()
    .then(posts => res.json({ posts: posts.filter(p => p.createdBy == req.user) }))
    .catch(err => res.status(500).json({ error: err }))
});

/* 
** @route   POST /:id
** @desc    Delete a post based on ID
^^ @access  Private
*/ 
router.post('/:id', auth, (req, res) => {
  Post.findByIdAndDelete(req.params.id)
    .then(post => res.status(201).json({ post }))
    .catch(err => res.status(500).json({ error: err }))
});

module.exports = router
