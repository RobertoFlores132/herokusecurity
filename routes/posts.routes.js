const express = require('express');

// Controllers
const {
	getAllPosts,
	createPost,
	getPostById,
	updatePost,
	deletePost,
} = require('../controllers/posts.controller');

const { protectSession } = require('../middlewares/auth.middleware');
const { postExists } = require('../middlewares/posts.middleware');

const { upload } = require('../utils/upload.util')

const postsRouter = express.Router();

postsRouter
	.route('/')
	.get(getAllPosts)
	.post(upload.single('postImg'), createPost);

postsRouter
	.use('/:id', postExists)
	.route('/:id')
	.get(protectSession, getPostById)
	.patch(protectSession, updatePost)
	.delete(protectSession, deletePost);

module.exports = { postsRouter };