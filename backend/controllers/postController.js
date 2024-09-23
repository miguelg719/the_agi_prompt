const Post = require('../models/post');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      user: req.userId,
      title: req.body.title,
      body: req.body.body,
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};