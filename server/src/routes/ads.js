import { Router } from 'express';
import { Ad } from '../models/Ad.js';

const router = Router();

// GET /api/ads/:slot
router.get('/:slot', async (req, res, next) => {
  try {
    const ad = await Ad.findOne({ slot: req.params.slot, active: true }).lean();
    if (!ad) {
      return res.status(404).json({ error: 'বিজ্ঞাপন পাওয়া যায়নি' });
    }
    res.json(ad);
  } catch (error) {
    next(error);
  }
});

export default router;
