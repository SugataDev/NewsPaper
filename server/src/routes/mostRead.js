import { Router } from 'express';
import { Article } from '../models/Article.js';

const router = Router();

// GET /api/most-read?tab=read|trending|good
router.get('/', async (req, res, next) => {
  try {
    const { tab = 'read' } = req.query;
    let query = { status: 'published' };
    let sort = { 'stats.views': -1, publishedAt: -1 };

    if (tab === 'trending') {
      query['flags.trending'] = true;
      sort = { publishedAt: -1 };
    } else if (tab === 'good') {
      query['flags.goodNews'] = true;
      sort = { publishedAt: -1 };
    }

    let items = await Article.find(query).sort(sort).limit(5).lean();

    // Fallback if flags have less than 5 items
    if (items.length < 5) {
      const extra = await Article.find({ status: 'published', _id: { $nin: items.map((i) => i._id) } })
        .sort({ 'stats.views': -1 })
        .limit(5 - items.length)
        .lean();
      items = items.concat(extra);
    }

    res.json(items);
  } catch (error) {
    next(error);
  }
});

export default router;
