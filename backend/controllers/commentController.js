const Comment = require('../models/comment');

exports.getAllCommentsByPrompt = async (req, res) => {
  try {
    const comments = await Comment.find({ prompt: req.params.id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.postComment = async (req, res) => {
  try {
    const { prompt, user, body } = req.body;
    const newComment = new Comment({
      prompt,
      user,
      body,
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
