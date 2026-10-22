import { Router } from 'express';
import { getHomepageData } from '../services/homeService.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await getHomepageData();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;
