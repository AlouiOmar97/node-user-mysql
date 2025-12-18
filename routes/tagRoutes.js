const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');

// Routes CRUD principales
router.get('/', tagController.getAllTags);
router.get('/:id', tagController.getTagById);
router.post('/', tagController.createTag);
router.put('/:id', tagController.updateTag);
router.delete('/:id', tagController.deleteTag);

// Routes de filtrage
router.get('/status/:status', tagController.getTagsByStatus);

module.exports = router;


