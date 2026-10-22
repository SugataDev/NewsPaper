import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';
import { Category } from '../models/Category.js';
import { Author } from '../models/Author.js';
import { Topic } from '../models/Topic.js';
import { Location } from '../models/Location.js';
import { Ad } from '../models/Ad.js';
import { Article } from '../models/Article.js';

import { categoriesData, authorsData, topicsData } from './categories.js';
import { bangladeshLocations } from './locations.js';
import { generateAllArticles } from './articlesGenerator.js';

dotenv.config();

async function runSeed() {
  console.log('--- Starting Database Seeding ---');
  await connectDB();

  // 1. Clear existing collections
  console.log('Clearing old collections...');
  await Promise.all([
    User.deleteMany({}),
    Category.deleteMany({}),
    Author.deleteMany({}),
    Topic.deleteMany({}),
    Location.deleteMany({}),
    Ad.deleteMany({}),
    Article.deleteMany({}),
  ]);

  // 2. Seed Admin User
  console.log('Creating Admin User...');
  const salt = await bcrypt.genSalt(10);
  const adminPasswordHash = await bcrypt.hash('admin123456', salt);
  const adminUser = await User.create({
    name: 'প্রধান সম্পাদক',
    email: 'admin@khaborghor.com',
    passwordHash: adminPasswordHash,
    role: 'admin',
  });
  console.log(`Admin user created: ${adminUser.email} (Password: admin123456)`);

  // 3. Seed Categories
  console.log('Seeding Categories...');
  await Category.insertMany(categoriesData);

  // 4. Seed Authors
  console.log('Seeding Authors...');
  const authors = await Author.insertMany(authorsData);

  // 5. Seed Topics
  console.log('Seeding Topics...');
  await Topic.insertMany(topicsData);

  // 6. Seed Locations
  console.log('Seeding Bangladesh Divisions, Districts and Upazilas...');
  await Location.insertMany(bangladeshLocations);

  // 7. Seed Ads
  console.log('Seeding Ad Slots...');
  const adsData = [
    {
      slot: 'leaderboard',
      title: 'শীর্ষ ব্যানার বিজ্ঞাপন',
      size: '970x90',
      active: true,
    },
    {
      slot: 'billboard',
      title: 'বিলবোর্ড বিজ্ঞাপন স্লট ১',
      size: '970x250',
      active: true,
    },
    {
      slot: 'hero-right',
      title: 'হিরো সেকশন সাইডবার বিজ্ঞাপন',
      size: '300x250',
      active: true,
    },
    {
      slot: 'sports-right',
      title: 'খেলাধুলা সাইডবার বিজ্ঞাপন',
      size: '300x250',
      active: true,
    },
    {
      slot: 'bangladesh-right',
      title: 'বাংলাদেশ সেকশন বিজ্ঞাপন',
      size: '300x250',
      active: true,
    },
    {
      slot: 'bottom-billboard',
      title: 'নিচের বিলবোর্ড বিজ্ঞাপন স্লট',
      size: '970x250',
      active: true,
    },
  ];
  await Ad.insertMany(adsData);

  // 8. Seed Articles (170 articles)
  console.log('Generating 170+ original Bangla articles...');
  const allArticles = generateAllArticles(authors);
  await Article.insertMany(allArticles);
  console.log(`Successfully seeded ${allArticles.length} articles!`);

  console.log('--- Database Seeding Completed Successfully! ---');
  await mongoose.disconnect();
  process.exit(0);
}

runSeed().catch((err) => {
  console.error('Seed Error:', err);
  process.exit(1);
});
