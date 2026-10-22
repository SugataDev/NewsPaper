import { Router } from 'express';
import { Article } from '../models/Article.js';
import { Location } from '../models/Location.js';
import { Topic } from '../models/Topic.js';

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

    const conditions = [{ status: 'published' }];

    if (category) conditions.push({ category });
    if (sub) conditions.push({ subCategory: sub });
    if (type) conditions.push({ type });

    if (division) {
      const loc = await Location.findOne({
        type: 'division',
        $or: [{ slug: division }, { nameBn: division }],
      }).lean();
      if (loc) {
        conditions.push({ 'location.division': { $in: [loc.slug, loc.nameBn] } });
      } else {
        conditions.push({ 'location.division': division });
      }
    }

    if (district) {
      const loc = await Location.findOne({
        type: 'district',
        $or: [{ slug: district }, { nameBn: district }],
      }).lean();
      if (loc) {
        conditions.push({ 'location.district': { $in: [loc.slug, loc.nameBn] } });
      } else {
        conditions.push({ 'location.district': district });
      }
    }

    if (upazila) {
      const loc = await Location.findOne({
        type: 'upazila',
        $or: [{ slug: upazila }, { nameBn: upazila }],
      }).lean();
      if (loc) {
        conditions.push({ 'location.upazila': { $in: [loc.slug, loc.nameBn] } });
      } else {
        conditions.push({ 'location.upazila': upazila });
      }
    }

    if (tag) {
      const t = await Topic.findOne({
        $or: [{ slug: tag }, { nameBn: tag }],
      }).lean();
      if (t) {
        conditions.push({
          $or: [
            { tags: t.slug },
            { tags: t.nameBn },
            { tags: { $regex: new RegExp(t.nameBn, 'i') } },
          ],
        });
      } else {
        conditions.push({
          $or: [
            { tags: tag },
            { tags: { $regex: new RegExp(tag, 'i') } },
          ],
        });
      }
    }

    if (q) {
      conditions.push({ $text: { $search: q } });
    }

    const query = conditions.length === 1 ? conditions[0] : { $and: conditions };

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
