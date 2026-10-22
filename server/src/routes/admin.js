import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { Article } from '../models/Article.js';
import { Category } from '../models/Category.js';
import { Author } from '../models/Author.js';
import { Topic } from '../models/Topic.js';
import { Ad } from '../models/Ad.js';
import { User } from '../models/User.js';
import { uploadMiddleware, processAndSaveImage } from '../utils/uploader.js';
import { sanitizeRichText } from '../utils/sanitizer.js';
import { generateSlug } from '../utils/formatters.js';
import { invalidateHomeCache } from '../services/homeService.js';
import { articleInputSchema } from '../utils/validation.js';

const router = Router();

// Protect all admin routes: require authentication and roles admin or editor (or reporter for articles)
router.use(authenticate);
router.use(authorize('admin', 'editor', 'reporter'));

// POST /api/admin/upload
router.post('/upload', uploadMiddleware.single('image'), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'কোনো ইমেজ আপলোড করা হয়নি' });
    }
    const result = await processAndSaveImage(req.file.buffer, req.file.originalname);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/stats
router.get('/stats', async (req, res, next) => {
  try {
    const [
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews,
      topViewed,
      recentArticles,
      userCount,
    ] = await Promise.all([
      Article.countDocuments(),
      Article.countDocuments({ status: 'published' }),
      Article.countDocuments({ status: 'draft' }),
      Article.aggregate([
        { $group: { _id: null, total: { $sum: '$stats.views' } } },
      ]),
      Article.find().sort({ 'stats.views': -1 }).limit(5).lean(),
      Article.find().sort({ createdAt: -1 }).limit(6).lean(),
      User.countDocuments(),
    ]);

    res.json({
      totalArticles,
      publishedArticles,
      draftArticles,
      totalViews: totalViews[0]?.total || 0,
      userCount,
      topViewed,
      recentArticles,
    });
  } catch (error) {
    next(error);
  }
});

// --- ARTICLES ---

// GET /api/admin/articles
router.get('/articles', async (req, res, next) => {
  try {
    const { status, category, q, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) query.status = status;
    if (category) query.category = category;
    if (q) {
      query.title = { $regex: q.trim(), $options: 'i' };
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [articles, total] = await Promise.all([
      Article.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum).lean(),
      Article.countDocuments(query),
    ]);

    res.json({
      articles,
      pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/admin/articles/:id
router.get('/articles/:id', async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id).lean();
    if (!article) return res.status(404).json({ error: 'সংবাদটি পাওয়া যায়নি' });
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// POST /api/admin/articles
router.post('/articles', async (req, res, next) => {
  try {
    const parseResult = articleInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const data = parseResult.data;
    data.body = sanitizeRichText(data.body);

    let baseSlug = data.slug ? generateSlug(data.slug) : generateSlug(data.title);
    if (!baseSlug) baseSlug = `article-${Date.now()}`;

    // Ensure slug uniqueness
    let slug = baseSlug;
    let counter = 1;
    while (await Article.findOne({ slug })) {
      slug = `${baseSlug}-${counter++}`;
    }
    data.slug = slug;

    if (data.status === 'published' && !data.publishedAt) {
      data.publishedAt = new Date();
    }

    const article = await Article.create(data);
    invalidateHomeCache();
    res.status(201).json(article);
  } catch (error) {
    next(error);
  }
});

// PUT /api/admin/articles/:id
router.put('/articles/:id', async (req, res, next) => {
  try {
    const parseResult = articleInputSchema.safeParse(req.body);
    if (!parseResult.success) {
      return res.status(400).json({ error: parseResult.error.errors[0].message });
    }

    const data = parseResult.data;
    if (data.body) {
      data.body = sanitizeRichText(data.body);
    }

    // Check slug collision if slug changed
    if (data.slug) {
      const cleanSlug = generateSlug(data.slug);
      const existing = await Article.findOne({ slug: cleanSlug, _id: { $ne: req.params.id } });
      if (existing) {
        data.slug = `${cleanSlug}-${Date.now().toString().slice(-4)}`;
      } else {
        data.slug = cleanSlug;
      }
    }

    const article = await Article.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!article) return res.status(404).json({ error: 'সংবাদটি পাওয়া যায়নি' });

    invalidateHomeCache();
    res.json(article);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/admin/articles/:id
router.delete('/articles/:id', async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: 'সংবাদটি পাওয়া যায়নি' });

    invalidateHomeCache();
    res.json({ success: true, message: 'সংবাদটি সফলভাবে মুছে ফেলা হয়েছে' });
  } catch (error) {
    next(error);
  }
});

// --- CATEGORIES ---
router.post('/categories', authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const { nameBn, slug, order, showInNav, parent } = req.body;
    const cat = await Category.create({
      nameBn,
      slug: slug || generateSlug(nameBn),
      order: Number(order) || 0,
      showInNav: showInNav !== undefined ? showInNav : true,
      parent: parent || null,
    });
    res.status(201).json(cat);
  } catch (error) {
    next(error);
  }
});

router.put('/categories/:id', authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const cat = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cat);
  } catch (error) {
    next(error);
  }
});

router.delete('/categories/:id', authorize('admin'), async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// --- TOPICS ---
router.get('/topics', async (req, res, next) => {
  try {
    const topics = await Topic.find().sort({ order: 1 }).lean();
    res.json(topics);
  } catch (error) {
    next(error);
  }
});

router.post('/topics', authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const { nameBn, slug, isTrending, order } = req.body;
    const topic = await Topic.create({
      nameBn,
      slug: slug || generateSlug(nameBn),
      isTrending: !!isTrending,
      order: Number(order) || 0,
    });
    invalidateHomeCache();
    res.status(201).json(topic);
  } catch (error) {
    next(error);
  }
});

router.put('/topics/:id', authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, { new: true });
    invalidateHomeCache();
    res.json(topic);
  } catch (error) {
    next(error);
  }
});

router.delete('/topics/:id', authorize('admin'), async (req, res, next) => {
  try {
    await Topic.findByIdAndDelete(req.params.id);
    invalidateHomeCache();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// --- AUTHORS ---
router.get('/authors', async (req, res, next) => {
  try {
    const authors = await Author.find().sort({ nameBn: 1 }).lean();
    res.json(authors);
  } catch (error) {
    next(error);
  }
});

router.post('/authors', authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const { nameBn, slug, avatar, designation, bio } = req.body;
    const author = await Author.create({
      nameBn,
      slug: slug || generateSlug(nameBn),
      avatar: avatar || '',
      designation: designation || '',
      bio: bio || '',
    });
    res.status(201).json(author);
  } catch (error) {
    next(error);
  }
});

router.put('/authors/:id', authorize('admin', 'editor'), async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(author);
  } catch (error) {
    next(error);
  }
});

router.delete('/authors/:id', authorize('admin'), async (req, res, next) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// --- ADS ---
router.get('/ads', async (req, res, next) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 }).lean();
    res.json(ads);
  } catch (error) {
    next(error);
  }
});

router.post('/ads', authorize('admin'), async (req, res, next) => {
  try {
    const ad = await Ad.create(req.body);
    invalidateHomeCache();
    res.status(201).json(ad);
  } catch (error) {
    next(error);
  }
});

router.put('/ads/:id', authorize('admin'), async (req, res, next) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    invalidateHomeCache();
    res.json(ad);
  } catch (error) {
    next(error);
  }
});

router.delete('/ads/:id', authorize('admin'), async (req, res, next) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    invalidateHomeCache();
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// --- USERS ---
router.get('/users', authorize('admin'), async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash').sort({ createdAt: -1 }).lean();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.put('/users/:id/role', authorize('admin'), async (req, res, next) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-passwordHash');
    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
