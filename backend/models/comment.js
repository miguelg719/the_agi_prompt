const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0
  },
  downvotes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userVotes: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    vote: {
      type: Number,
      enum: [-1, 0, 1]
    }
  }]
});

const Comment = mongoose.model('Comment', CommentSchema);
module.exports = Comment;