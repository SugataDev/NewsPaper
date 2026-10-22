import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    kicker: { type: String, default: '', trim: true },
    slug: { type: String, required: true, unique: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    body: { type: String, required: true },
    type: {
      type: String,
      enum: ['news', 'video', 'gallery', 'opinion'],
      default: 'news',
    },
    coverImage: {
      url: { type: String, default: '' },
      alt: { type: String, default: '' },
      caption: { type: String, default: '' },
      credit: { type: String, default: '' },
    },
    gallery: [
      {
        url: { type: String, required: true },
        caption: { type: String, default: '' },
      },
    ],
    videoUrl: { type: String, default: '' },
    category: { type: String, required: true, index: true },
    subCategory: { type: String, default: '' },
    tags: [{ type: String, trim: true }],
    location: {
      division: { type: String, default: '' },
      district: { type: String, default: '' },
      upazila: { type: String, default: '' },
    },
    authors: [
      {
        nameBn: { type: String, required: true },
        slug: { type: String, default: '' },
        avatar: { type: String, default: '' },
        designation: { type: String, default: '' },
      },
    ],
    status: {
      type: String,
      enum: ['draft', 'scheduled', 'published'],
      default: 'published',
      index: true,
    },
    publishedAt: { type: Date, default: Date.now, index: true },
    scheduledAt: { type: Date, default: null },
    pinned: {
      home: { type: Boolean, default: false },
      order: { type: Number, default: 0 },
      slot: { type: String, default: '' },
    },
    flags: {
      breaking: { type: Boolean, default: false },
      trending: { type: Boolean, default: false },
      goodNews: { type: Boolean, default: false },
    },
    stats: {
      views: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },
    seo: {
      metaTitle: { type: String, default: '' },
      metaDescription: { type: String, default: '' },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

// Required compound and text indexes
articleSchema.index({ status: 1, publishedAt: -1 });
articleSchema.index({ category: 1, publishedAt: -1 });
articleSchema.index({ 'location.district': 1, publishedAt: -1 });
articleSchema.index({ 'flags.trending': 1, publishedAt: -1 });
articleSchema.index(
  { title: 'text', excerpt: 'text', body: 'text' },
  { default_language: 'none' }
);

export const Article = mongoose.model('Article', articleSchema);
