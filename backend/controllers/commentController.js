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

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { vote, userId, ...updateData } = req.body;

    if (vote !== undefined && userId) {
      const comment = await Comment.findById(id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      const existingVoteIndex = comment.userVotes.findIndex(v => v.user.toString() === userId);
      const oldVote = existingVoteIndex !== -1 ? comment.userVotes[existingVoteIndex].vote : 0;

      if (existingVoteIndex !== -1) {
        comment.userVotes[existingVoteIndex].vote = vote;
      } else {
        comment.userVotes.push({ user: userId, vote });
      }

      // Update upvotes and downvotes
      if (oldVote === 1) comment.upvotes--;
      if (oldVote === -1) comment.downvotes--;
      if (vote === 1) comment.upvotes++;
      if (vote === -1) comment.downvotes++;

      await comment.save();

      const updatedComment = await Comment.findByIdAndUpdate(id, updateData, { new: true })
        .populate('user', 'username');

      // Add userVote to the response
      const responseComment = updatedComment.toObject();
      responseComment.userVote = vote;

      return res.json(responseComment);
    } else {
      const updatedComment = await Comment.findByIdAndUpdate(id, updateData, { new: true })
        .populate('user', 'username');
      return res.json(updatedComment);
    }
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ error: 'Error updating comment', details: error.message });
  }
};
