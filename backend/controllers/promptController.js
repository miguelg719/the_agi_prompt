const Prompt = require('../models/Prompt');

// Get all prompts
exports.getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find();
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a prompt by ID
exports.getPromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findOne({ _id: req.params.id });
    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json(prompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new prompt
exports.createPrompt = async (req, res) => {
  try {
    const { id, title, prompt, author, tags, votes, comments } = req.body;
    const newPrompt = new Prompt({
      id,
      title,
      prompt,
      author,
      tags,
      votes,
      comments
    });

    const savedPrompt = await newPrompt.save();
    res.status(201).json(savedPrompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a prompt by ID
exports.updatePrompt = async (req, res) => {
  try {
    const updatedPrompt = await Prompt.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedPrompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json(updatedPrompt);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a prompt by ID
exports.deletePrompt = async (req, res) => {
  try {
    const deletedPrompt = await Prompt.findOneAndDelete({ id: req.params.id });
    if (!deletedPrompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};