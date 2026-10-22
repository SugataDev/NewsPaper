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

// GET /api/topics/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const topic = await Topic.findOne({ slug: req.params.slug }).lean();
    if (!topic) {
      return res.status(404).json({ error: 'বিষয়টি পাওয়া যায়নি' });
    }
    res.json(topic);
  } catch (error) {
    next(error);
  }
});

export default router;
