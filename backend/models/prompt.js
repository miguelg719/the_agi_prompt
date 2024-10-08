const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const promptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'  // Reference to the Comment model
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'Author',
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