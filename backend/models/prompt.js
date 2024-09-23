const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  id: Number,
  title: String,
  prompt: String,
  votes: Number,
  comments: Number,
  author: String,
  createdAt: Date,
  tags: [String],
});

const Prompt = mongoose.model('Prompt', promptSchema);

module.exports = Prompt;