import { Router } from 'express';
import { Article } from '../models/Article.js';

const router = Router();

// GET /api/articles
router.get('/', async (req, res, next) => {
  try {
    const {
      category,
      sub,
      tag,
      division,
      district,
      upazila,
      type,
      q,
      page = 1,
      limit = 12,
    } = req.query;

    const query = { status: 'published' };

    if (category) query.category = category;
    if (sub) query.subCategory = sub;
    if (tag) query.tags = tag;
    if (type) query.type = type;
    if (division) query['location.division'] = division;
    if (district) query['location.district'] = district;
    if (upazila) query['location.upazila'] = upazila;

    if (q) {
      query.$text = { $search: q };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

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

// GET /api/articles/:slug
router.get('/:slug', async (req, res, next) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug }).lean();
    if (!article) {
      return res.status(404).json({ error: 'সংবাদটি খুঁজে পাওয়া যায়নি' });
    }

    // Fetch related stories (same category, excluding current article)
    const related = await Article.find({
      status: 'published',
      category: article.category,
      _id: { $ne: article._id },
    })
      .sort({ publishedAt: -1 })
      .limit(4)
      .lean();

    res.json({ article, related });
  } catch (error) {
    next(error);
  }
});

// POST /api/articles/:id/view
router.post('/:id/view', async (req, res, next) => {
  try {
    await Article.findByIdAndUpdate(req.params.id, {
      $inc: { 'stats.views': 1 },
    });
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

export default router;
