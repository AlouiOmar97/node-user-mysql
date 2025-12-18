const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Routes CRUD principales
router.get('/', commentController.getAllComments);
router.get('/:id', commentController.getCommentById);
router.post('/', commentController.createComment);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

// Routes de filtrage
router.get('/suggestion/:suggestionId', commentController.getCommentsBySuggestion);

module.exports = router;


