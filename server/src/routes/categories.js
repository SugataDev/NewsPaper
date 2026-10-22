import { Router } from 'express';
import { Category } from '../models/Category.js';

const router = Router();

// GET /api/categories
router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ order: 1 }).lean();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

export default router;
