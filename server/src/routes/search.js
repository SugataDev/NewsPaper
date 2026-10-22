import { Router } from 'express';
import { Article } from '../models/Article.js';

const router = Router();

// GET /api/search?q=...
router.get('/', async (req, res, next) => {
  try {
    const { q, page = 1, limit = 12 } = req.query;
    if (!q || !q.trim()) {
      return res.json({ articles: [], pagination: { page: 1, limit, total: 0, totalPages: 0 } });
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    // Use regex fallback alongside text search for partial Bangla matches
    const searchRegex = new RegExp(q.trim(), 'i');
    const query = {
      status: 'published',
      $or: [
        { title: searchRegex },
        { excerpt: searchRegex },
        { tags: searchRegex },
      ],
    };

    const [articles, total] = await Promise.all([
      Article.find(query)
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Article.countDocuments(query),
    ]);

    res.json({
      articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
