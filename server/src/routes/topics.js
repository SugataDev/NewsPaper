import { Router } from 'express';
import { Topic } from '../models/Topic.js';

const router = Router();

// GET /api/topics/trending
router.get('/trending', async (req, res, next) => {
  try {
    const topics = await Topic.find({ isTrending: true })
      .sort({ order: 1 })
      .limit(20)
      .lean();
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

export default router;
