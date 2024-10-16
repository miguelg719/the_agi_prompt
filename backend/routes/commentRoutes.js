const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Route to get all prompts
router.get('/prompt/:id', commentController.getAllCommentsByPrompt);

// Route to create a new prompt
router.post('/', commentController.postComment);

// Route to update a specific comment
// router.put('/:id', commentController.updatePrompt);

// Route to delete a specific comment
// router.delete('/:id', commentController.deletePrompt);

module.exports = router;