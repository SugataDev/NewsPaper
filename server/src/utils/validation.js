import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'editor', 'reporter', 'reader']).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const articleInputSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  kicker: z.string().optional(),
  slug: z.string().optional(),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  body: z.string().min(10, 'Body content is required'),
  type: z.enum(['news', 'video', 'gallery', 'opinion']).default('news'),
  coverImage: z.object({
    url: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
    credit: z.string().optional(),
  }).optional(),
  gallery: z.array(z.object({
    url: z.string(),
    caption: z.string().optional(),
  })).optional(),
  videoUrl: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  subCategory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  location: z.object({
    division: z.string().optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
  }).optional(),
  authors: z.array(z.object({
    nameBn: z.string(),
    slug: z.string().optional(),
    avatar: z.string().optional(),
    designation: z.string().optional(),
  })).optional(),
  status: z.enum(['draft', 'scheduled', 'published']).default('published'),
  pinned: z.object({
    home: z.boolean().optional(),
    order: z.number().optional(),
    slot: z.string().optional(),
  }).optional(),
  flags: z.object({
    breaking: z.boolean().optional(),
    trending: z.boolean().optional(),
    goodNews: z.boolean().optional(),
  }).optional(),
  seo: z.object({
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    keywords: z.array(z.string()).optional(),
  }).optional(),
});
