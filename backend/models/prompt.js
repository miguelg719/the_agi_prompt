const mongoose = require('mongoose');

const promptSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    default: 0
  },
  comments: {
    type: Number,
    default: 0
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tags: {
    type: [String]  
  }
}, { timestamps: true });

const Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;