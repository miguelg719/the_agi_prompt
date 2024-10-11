const express = require('express');
const router = express.Router();
const promptController = require('../controllers/promptController');

// Route to get all prompts
router.get('/', promptController.getAllPrompts);

router.get('/user/:id', promptController.getAllPromptsByUser);

// Route to get a specific prompt by ID
router.get('/:id', promptController.getPromptById);

// Route to create a new prompt
router.post('/', promptController.createPrompt);

// Route to update a specific prompt
router.put('/:id', promptController.updatePrompt);

// Route to delete a specific prompt
router.delete('/:id', promptController.deletePrompt);

module.exports = router;