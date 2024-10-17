const Prompt = require('../models/prompt');

// Get all prompts
exports.getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find().populate('author', 'username');
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllPromptsByUser = async (req, res) => {
  try {
    const prompts = await Prompt.find({ author: req.params.id });
    res.status(200).json(prompts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a prompt by ID
exports.getPromptById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user ? req.user._id : null;

    const prompt = await Prompt.findById(id)
      .populate('author', 'username')

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    const promptObj = prompt.toObject();

    if (userId) {
      const userVote = prompt.userVotes.find(v => v.user.toString() === userId.toString());
      promptObj.userVote = userVote ? userVote.vote : 0;
    }

    res.json(promptObj);
  } catch (error) {
    console.error('Error fetching prompt:', error);
    res.status(500).json({ message: 'Error fetching prompt', error: error.message });
  }
};

// Create a new prompt
exports.createPrompt = async (req, res) => {
  try {
    const { title, prompt, author, tags } = req.body;
    const newPrompt = new Prompt({
      title,
      prompt,
      author,
      tags
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
    const { id } = req.params;
    const { vote, userId, ...updateData } = req.body;

    if (vote !== undefined && userId) {
      const prompt = await Prompt.findById(id);
      if (!prompt) {
        return res.status(404).json({ message: 'Prompt not found' });
      }

      const existingVoteIndex = prompt.userVotes.findIndex(v => v.user.toString() === userId);
      const oldVote = existingVoteIndex !== -1 ? prompt.userVotes[existingVoteIndex].vote : 0;

      if (existingVoteIndex !== -1) {
        prompt.userVotes[existingVoteIndex].vote = vote;
      } else {
        prompt.userVotes.push({ user: userId, vote });
      }

      // Update upvotes and downvotes
      if (oldVote === 1) prompt.upvotes--;
      if (oldVote === -1) prompt.downvotes--;
      if (vote === 1) prompt.upvotes++;
      if (vote === -1) prompt.downvotes++;

      await prompt.save();

      const updatedPrompt = await Prompt.findByIdAndUpdate(id, updateData, { new: true })
        .populate('author', 'username')
        .populate('comments');

      // Add userVote to the response
      const responsePrompt = updatedPrompt.toObject();
      responsePrompt.userVote = vote;

      return res.json(responsePrompt);
    } else {
      const updatedPrompt = await Prompt.findByIdAndUpdate(id, updateData, { new: true })
        .populate('author', 'username')
        .populate('comments');
      return res.json(updatedPrompt);
    }
  } catch (error) {
    console.error('Error updating prompt:', error);
    res.status(500).json({ message: 'Error updating prompt', error: error.message });
  }
};

// Delete a prompt by ID
exports.deletePrompt = async (req, res) => {
  try {
    const deletedPrompt = await Prompt.findOneAndDelete({ _id: req.params.id });
    if (!deletedPrompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }
    res.status(200).json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
