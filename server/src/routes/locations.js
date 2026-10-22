import { Router } from 'express';
import { Location } from '../models/Location.js';

const router = Router();

// GET /api/locations?type&parent
router.get('/', async (req, res, next) => {
  try {
    const { type, parent } = req.query;
    const query = {};
    if (type) query.type = type;
    if (parent) query.parent = parent;

    const locations = await Location.find(query).sort({ nameBn: 1 }).lean();
    res.json(locations);
  } catch (error) {
    next(error);
  }
});

export default router;
