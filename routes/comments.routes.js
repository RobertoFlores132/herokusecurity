const express = require('express');

// Controllers
const {
	getAllComments,
	createComments,
	getCommentById,
	updateComment,
	deleteComment,
} = require('../controllers/comments.controller');

//Middlewares
const { commentExists } = require('../middlewares/comments.middleware');

const commentsRouter = express.Router();

commentsRouter.get('/', getAllComments);

commentsRouter.post('/', createComments);

commentsRouter.get('/:id', commentExists, getCommentById);

commentsRouter.patch('/:id', commentExists, updateComment);

commentsRouter.delete('/:id', commentExists, deleteComment);

module.exports = { commentsRouter };