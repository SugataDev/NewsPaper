import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import homeRoutes from './routes/home.js';
import articlesRoutes from './routes/articles.js';
import mostReadRoutes from './routes/mostRead.js';
import topicsRoutes from './routes/topics.js';
import categoriesRoutes from './routes/categories.js';
import locationsRoutes from './routes/locations.js';
import searchRoutes from './routes/search.js';
import adsRoutes from './routes/ads.js';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(compression());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
  })
);

// Serve uploaded images statically
app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

// Routes
app.use('/api/home', homeRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/most-read', mostReadRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Central error handler
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'একটি অনাকাঙ্ক্ষিত ত্রুটি ঘটেছে';
  const response = { error: message };

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
});

export default app;
