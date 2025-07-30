import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: { type: String, required: true },  
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
