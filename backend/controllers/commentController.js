const Comment = require('../models/comment');

exports.getCommentsByIdList = async (req, res) => {
  try {
    const ids = req.query.ids; // Assuming the array of IDs is passed in the body
    if (!ids || ids.length === 0) {
      return res.status(200).json([]);
    }

    const comments = await Comment.find({ _id: { $in: ids } }).populate('user', 'username')
      .sort({ created_at: 1 }); // Sort by created_at ascending (1 for ascending, -1 for descending)
    
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
