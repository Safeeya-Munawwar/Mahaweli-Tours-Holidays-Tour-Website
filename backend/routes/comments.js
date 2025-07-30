import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// POST add comment
router.post('/', async (req, res) => {
  try {
    console.log('Received comment:', req.body);
    const { postId, name, email, message } = req.body;
    if (!postId || !name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newComment = new Comment({ postId, name, email, message });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    console.error('Error saving comment:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET comments by postId
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
